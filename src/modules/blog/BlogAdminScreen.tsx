import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { DisplayMarkdown } from "./DisplayMarkdown";
import { MarkdownEditor } from "./MarkdownEditor";
import { MainLayout } from "@/components/layout/Layout";

export const BlogAdminScreen = () => {
  const [titleInput, setTitleInput] = useState("");
  const [contentInput, setContentInput] = useState("");

  return (
    <MainLayout>
      <div className="flex flex-col gap-4">
        <div>
          <Label htmlFor="blogTitle">Post Title</Label>
          <Input
            id="blogTitle"
            value={titleInput}
            onInput={(e) => setTitleInput((e.target as unknown as { value: string }).value)}
            placeholder="Enter your blog post title..."
          />
        </div>

        <MarkdownEditor value={contentInput} onChange={(x) => setContentInput(x)} />

        <div>Preview</div>
        <div>
          <DisplayMarkdown>{contentInput}</DisplayMarkdown>
        </div>
      </div>
    </MainLayout>
  );
};
