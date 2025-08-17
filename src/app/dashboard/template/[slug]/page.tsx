"use client";

import React, { useState, useRef, useEffect } from "react";

import { Template } from "../../../../utils/types";
import { Button } from "@/components/ui/button";
import template from "@/utils/template";
import Image from "next/image";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft, Copy, Loader2Icon } from "lucide-react";
import Link from "next/link";
import { runAI } from "@/app/actions/ai";
import "@toast-ui/editor/dist/toastui-editor.css";
import { Editor } from "@toast-ui/react-editor";
import toast from "react-hot-toast";
import { saveQuery } from "../../../actions/ai";
import { useUser } from "@clerk/nextjs";
import { useUsage } from "../../../../../context/usageProvider";

type Props = {
  params: Promise<{ slug: string }>;
};

const Page = ({ params }: Props) => {
  // unwrap params using React.use()
  const resolvedParams = React.use(params);
  const slug = resolvedParams.slug;

  // States
  const [query, setQuery] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  // ref
  const editorRef = useRef<Editor | null>(null);

  // Find template matching slug
  const currentTemplate = template.find(
    (item) => item.slug === slug
  ) as Template;

  // const { fetchUsage, subscribed, count } = useUsage(); // context
  const { fetchUsage, count } = useUsage(); // context
  const { user } = useUser();
  // console.log("useUser() in slug page", user);
  const email = user?.primaryEmailAddress?.emailAddress || "";

  useEffect(() => {
    const editorInstance = editorRef.current?.getInstance();
    if (editorInstance) {
      editorInstance.setMarkdown(content);
    }
  }, [content]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const data = await runAI(currentTemplate.aiPrompt + query);
      setContent(data);
      // save to db
      await saveQuery(currentTemplate, email, query, data);
      fetchUsage();
    } catch (err) {
      setError(err as Error);
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = async () => {
    const editorInstance = editorRef.current?.getInstance();
    if (!editorInstance) {
      toast.error("Editor not ready.");
      return;
    }

    const copiedContent = editorInstance.getMarkdown(); // getHTML()

    try {
      await navigator.clipboard.writeText(copiedContent);
      toast.success("Content copied to clipboard.");
    } catch (err: unknown) {
      console.error("Clipboard copy error:", err); // Логируем ошибку для отладки
      toast.error("An error occurred. Please try again.");
    }
  };

  return (
    <div>
      <div className="flex justify-between mx-5 my-3">
        <Link href="/dashboard">
          <Button>
            <ArrowLeft /> <span className="ml-2 cursor-pointer">Back</span>
          </Button>
        </Link>

        <Button onClick={handleCopy}>
          <Copy /> <span className="ml-2 cursor-pointer">Copy</span>
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 px-5">
        <div className="col-span-1 bg-slate-100 dark:bg-slate-900 rounded-md border p-5">
          <div className="flex flex-col gap-3">
            <Image
              src={currentTemplate.icon}
              alt={currentTemplate.name}
              width={50}
              height={50}
            />
            <h2 className="font-medium text-lg">{currentTemplate.name}</h2>
            <p className="text-gray-500">{currentTemplate.desc}</p>
          </div>

          <form className="mt-6" onSubmit={handleSubmit}>
            {currentTemplate.form.map((item) => (
              <div key={item.name} className="my-2 flex flex-col gap-2 mb-7">
                <label className="font-bold pb-5" htmlFor={item.name}>
                  {item.label}
                </label>

                {item.field === "input" ? (
                  <Input
                    id={item.name}
                    name={item.name}
                    onChange={(e) => setQuery(e.target.value)}
                    required={item.required}
                  />
                ) : (
                  <Textarea
                    id={item.name}
                    name={item.name}
                    onChange={(e) => setQuery(e.target.value)}
                    required={item.required}
                  />
                )}
              </div>
            ))}

            <Button type="submit" className="w-full py-6" disabled={loading}>
              {loading && <Loader2Icon className="animate-spin mr-2" />}
              Generate content
            </Button>
          </form>

          {error && <p className="text-red-500 mt-2">{error.message}</p>}
        </div>
        <div className="col-span-2">
          <Editor
            ref={editorRef}
            initialValue="Generated content will appear here."
            previewStyle="vertical"
            height="600px"
            initialEditType="wysiwyg"
            useCommandShortcut={true}
            // onChange={() =>
            //   setContent(editorRef.current.getInstance().getMarkdown())
            // }
          />
        </div>
      </div>
    </div>
  );
};

export default Page;
