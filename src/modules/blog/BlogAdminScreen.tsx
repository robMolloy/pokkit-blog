import { MainLayout } from "@/components/layout/Layout";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { MarkdownEditor } from "./MarkdownEditor";

export const BlogAdminScreen = () => {
  const [titleInput, setTitleInput] = useState("");
  // const [markdownInput, setMarkdownInput] = useState("");
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

        <div>
          <MarkdownEditor />
          {/* <TipTap /> */}
          {/* <EditorContent editor={editor} /> */}
          {/* <FloatingMenu editor={editor}>This is the floating menu</FloatingMenu>
          <BubbleMenu editor={editor}>This is the bubble menu</BubbleMenu> */}
        </div>
      </div>
    </MainLayout>
  );
};
