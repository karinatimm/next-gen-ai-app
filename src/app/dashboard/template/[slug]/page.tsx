"use client";

import React from "react";
import { Template } from "../../../../utils/types";
import { Button } from "@/components/ui/button";
import template from "@/utils/template";
import Image from "next/image";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Loader2Icon } from "lucide-react";
import { runAI } from "@/app/actions/ai";

type Props = {
  params: Promise<{ slug: string }>;
};

const Page = ({ params }: Props) => {
  // unwrap params using React.use()
  const resolvedParams = React.use(params);
  const slug = resolvedParams.slug;

  // Find template matching slug
  const currentTemplate = template.find(
    (item) => item.slug === slug
  ) as Template;

  // States
  const [query, setQuery] = React.useState("");
  const [content, setContent] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<Error | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const data = await runAI(currentTemplate.aiPrompt + query);
      setContent(data);
    } catch (err) {
      setError(err as Error);
    } finally {
      setLoading(false);
    }
  };

  if (!currentTemplate) {
    return <div>Template not found</div>;
  }

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 px-5">
        <div className="col-span-1 bg-slate-100 dark:bg-slate-900 rounded-md border p-5">
          <div className="flex flex-col gap-3">
            <Image
              src={currentTemplate.icon}
              alt={currentTemplate.name}
              width={50}
              height={50}
              style={{ width: "auto", height: 50 }}
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
      </div>

      <div className="col-span-2 whitespace-pre-wrap mt-5">{content}</div>
    </div>
  );
};

export default Page;
