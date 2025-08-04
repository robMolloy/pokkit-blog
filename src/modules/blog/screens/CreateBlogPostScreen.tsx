import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { DisplayMarkdown } from "../DisplayMarkdown";
import { MarkdownEditor } from "../MarkdownEditor";
import { MainLayout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { createBlogPostRecord } from "../dbBlogPostRecordUtils";
import { pb } from "@/config/pocketbaseConfig";
import { toast } from "sonner";
import { useRouter } from "next/router";

export const CreateBlogPostScreen = () => {
  const [title, setTitle] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [content, setContent] = useState("");
  const [imageId, setImageId] = useState("");
  const [imageCaption, setImageCaption] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();
  return (
    <MainLayout>
      <div className="flex flex-col gap-4">
        <div>
          <Label htmlFor="blogTitle">Post Title</Label>
          <Input
            id="blogTitle"
            value={title}
            onInput={(e) => setTitle((e.target as unknown as { value: string }).value)}
            placeholder="Enter your blog post title..."
          />
        </div>

        <MarkdownEditor value={content} onChange={(x) => setContent(x)} />

        <div className="flex justify-end gap-4">
          <Button
            onClick={async () => {
              if (isLoading) return;
              setIsLoading(true);

              const resp = await createBlogPostRecord({
                pb,
                data: {
                  title: title,
                  subtitle,
                  content: content,
                  blogPostImageId: imageId,
                  blogPostImageCaption: imageCaption,
                },
              });

              setIsLoading(false);
              console.log(`BlogAdminScreen.tsx:${/*LL*/ 43}`, { resp });
              if (resp.success)
                toast("Blog post created successfully!", {
                  duration: 10_000,
                  action: {
                    label: "Go to blog post",
                    onClick: () => router.push(`/admin/blog-post/${resp.data.id}`),
                  },
                });
            }}
          >
            Save Post
          </Button>
        </div>

        <div>Preview</div>
        <div>
          <DisplayMarkdown>{content}</DisplayMarkdown>
        </div>
      </div>
    </MainLayout>
  );
};
