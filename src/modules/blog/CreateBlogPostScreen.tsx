import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { DisplayMarkdown } from "./DisplayMarkdown";
import { MarkdownEditor } from "./MarkdownEditor";
import { MainLayout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { createBlogPostRecord } from "./dbBlogPostRecordUtils";
import { pb } from "@/config/pocketbaseConfig";
import { toast } from "sonner";
import { useRouter } from "next/router";

export const CreateBlogPostScreen = () => {
  const [titleInput, setTitleInput] = useState("");
  const [contentInput, setContentInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();
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

        <div className="flex justify-end gap-4">
          <Button
            onClick={async () => {
              if (isLoading) return;
              setIsLoading(true);

              const resp = await createBlogPostRecord({
                pb,
                data: { title: titleInput, content: contentInput },
              });

              setIsLoading(false);
              console.log(`BlogAdminScreen.tsx:${/*LL*/ 43}`, { resp });
              if (resp.success)
                toast("Blog post created successfully!", {
                  duration: 10_000,

                  action: { label: "Go to blog post", onClick: () => router.push("/admin/blog") },
                });
            }}
          >
            Save Post
          </Button>
        </div>

        <div>Preview</div>
        <div>
          <DisplayMarkdown>{contentInput}</DisplayMarkdown>
        </div>
      </div>
    </MainLayout>
  );
};
