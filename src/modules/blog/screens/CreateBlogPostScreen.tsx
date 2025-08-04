import { MainLayout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { pb } from "@/config/pocketbaseConfig";
import { useRouter } from "next/router";
import { useState } from "react";
import { toast } from "sonner";
import { DisplayBlogPost } from "../DisplayBlogPost";
import { MarkdownEditor } from "../MarkdownEditor";
import { useBlogPostImageRecordsStore } from "../blogPostImageRecordsStore";
import { createBlogPostRecord } from "../dbBlogPostRecordUtils";

export const CreateBlogPostScreen = () => {
  const [title, setTitle] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [content, setContent] = useState("");
  const [blogPostImageId, setBlogPostImageId] = useState("");
  const [blogPostImageCaption, setBlogPostImageCaption] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const blogPostImageRecordsStore = useBlogPostImageRecordsStore();

  const router = useRouter();
  return (
    <MainLayout>
      <div className="flex flex-col gap-4">
        <div>
          <Label htmlFor="blogTitle">Title</Label>
          <Input
            id="blogTitle"
            value={title}
            onInput={(e) => setTitle((e.target as unknown as { value: string }).value)}
            placeholder="Enter your blog post title..."
          />
        </div>
        <div>
          <Label htmlFor="blogSubtitle">Subtitle</Label>
          <Input
            id="blogTitle"
            value={subtitle}
            onInput={(e) => setSubtitle((e.target as unknown as { value: string }).value)}
            placeholder="Enter your blog post subtitle..."
          />
        </div>

        <div>
          <Label htmlFor="blogPostImageId">Image</Label>
          <Input
            id="blogPostImageId"
            value={blogPostImageId}
            onInput={(e) => setBlogPostImageId((e.target as unknown as { value: string }).value)}
            placeholder="Enter your blog post image id..."
          />
        </div>

        <div>
          <Label htmlFor="blogPostImageCaption">Image Caption</Label>
          <Input
            id="blogPostImageCaption"
            value={blogPostImageCaption}
            onInput={(e) =>
              setBlogPostImageCaption((e.target as unknown as { value: string }).value)
            }
            placeholder="Enter your blog post image caption..."
          />
        </div>

        <div>
          <Label htmlFor="blogContentInput">Content</Label>
          <MarkdownEditor
            id="blogContentInput"
            placeholder="Enter your blog post content..."
            value={content}
            onChange={(x) => setContent(x)}
          />
        </div>

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
                  blogPostImageId: blogPostImageId,
                  blogPostImageCaption: blogPostImageCaption,
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

        <DisplayBlogPost
          pb={pb}
          blogPost={{ title, subtitle, content, blogPostImageId, blogPostImageCaption }}
          blogPostImage={blogPostImageRecordsStore.data?.find((x) => x.id === blogPostImageId)}
        />
      </div>
    </MainLayout>
  );
};
