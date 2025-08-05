import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { pb } from "@/config/pocketbaseConfig";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { MarkdownEditor } from "./MarkdownEditor";
import {
  createBlogPostRecord,
  TBlogPostRecord,
  TBlogPostRecordFormData,
  updateBlogPostRecord,
} from "./dbBlogPostRecordUtils";
import { TBlogPostImageRecord } from "./dbBlogPostImageRecordUtils";
import { BlogPostImageSelect } from "./BlogPostImageSelect";
import { Switch } from "@/components/ui/switch";

export const CreateUpdateBlogPostForm = (p: {
  blogPostRecord?: TBlogPostRecord;
  blogPostImageRecords: TBlogPostImageRecord[];
  onChange: (x: TBlogPostRecordFormData) => void;
}) => {
  const [publishedAt, setPublishedAt] = useState(p.blogPostRecord?.publishedAt ?? "");
  const [title, setTitle] = useState(p.blogPostRecord?.title ?? "");
  const [subtitle, setSubtitle] = useState(p.blogPostRecord?.subtitle ?? "");
  const [content, setContent] = useState(p.blogPostRecord?.content ?? "");
  const [blogPostImageId, setBlogPostImageId] = useState(p.blogPostRecord?.blogPostImageId ?? "");
  const [blogPostImageCaption, setBlogPostImageCaption] = useState(
    p.blogPostRecord?.blogPostImageCaption ?? "",
  );
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  useEffect(() => {
    p.onChange({ publishedAt, title, subtitle, content, blogPostImageId, blogPostImageCaption });
  }, [publishedAt, title, subtitle, content, blogPostImageId, blogPostImageCaption]);

  const newData = { publishedAt, title, subtitle, content, blogPostImageId, blogPostImageCaption };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-4">
        <Label htmlFor="blogPublishedAt">Is Published?</Label>
        <Switch
          id="blogPublishedAt"
          checked={publishedAt !== ""}
          onCheckedChange={(x) => setPublishedAt(x ? new Date().toISOString() : "")}
        />
      </div>
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
        <BlogPostImageSelect
          pb={pb}
          blogPostImageRecords={p.blogPostImageRecords}
          value={blogPostImageId}
          onChange={(x) => setBlogPostImageId(x?.id ?? "")}
        />
      </div>

      <div>
        <Label htmlFor="blogPostImageCaption">Image Caption</Label>
        <Input
          id="blogPostImageCaption"
          value={blogPostImageCaption}
          onInput={(e) => setBlogPostImageCaption((e.target as unknown as { value: string }).value)}
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

            const resp = await (p.blogPostRecord?.id
              ? updateBlogPostRecord({ pb, data: { ...p.blogPostRecord, ...newData } })
              : createBlogPostRecord({ pb, data: newData }));

            setIsLoading(false);
            if (!resp.success) return toast("Something went wrong", { duration: 10_000 });

            if (p.blogPostRecord?.id)
              return toast("Blog post edited successfully!", { duration: 10_000 });

            toast("Blog post created successfully!", {
              duration: 10_000,
              action: {
                label: "Go to blog post",
                onClick: () => router.push(`/admin/blog-post/${resp.data.id}`),
              },
            });

            setPublishedAt("");
            setTitle("");
            setSubtitle("");
            setContent("");
            setBlogPostImageId("");
            setBlogPostImageCaption("");
          }}
        >
          Save Post
        </Button>
      </div>
    </div>
  );
};
