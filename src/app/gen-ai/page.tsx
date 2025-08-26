"use client";

import { ReactElement, useState } from "react";
import { runAI } from "../actions/ai";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Card, CardHeader, CardContent } from "../../components/ui/card";
import ReactMarkdown from "react-markdown";

function MarkdownWithLineBreaks({ content }: { content: string }) {
  const modifiedContent = content.replace(/([^\n])\n([^\n])/g, "$1  \n$2");
  return <ReactMarkdown>{modifiedContent}</ReactMarkdown>;
}

const Page = (): ReactElement => {
  const [response, setResponse] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [query, setQuery] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setResponse("");
    try {
      const data = await runAI(query);
      setResponse(data);
    } catch (err) {
      console.error(err);
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Unknown error");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="m-5">
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Ask anything"
        />
        <Button type="submit" disabled={loading}>
          {loading ? "Loading..." : "Generate with AI"}
        </Button>
      </form>

      {(loading || response) && (
        <Card className="mt-6">
          <CardHeader>AI Response will appear here..</CardHeader>
          <CardContent>
            {loading ? (
              <div>Loading...</div>
            ) : (
              <MarkdownWithLineBreaks content={response} />
            )}
          </CardContent>
        </Card>
      )}

      {error && (
        <div className="mt-4 text-sm text-red-500 font-medium">{error}</div>
      )}
    </div>
  );
};

export default Page;
