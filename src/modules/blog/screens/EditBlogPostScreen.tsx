import { MainLayout } from "@/components/layout/Layout";
import { pb } from "@/config/pocketbaseConfig";
import { useState } from "react";
import { DisplayBlogPost } from "../DisplayBlogPost";
import { useBlogPostImageRecordsStore } from "../blogPostImageRecordsStore";
import { useBlogPostRecordsStore } from "../blogPostRecordsStore";
import { CreateUpdateBlogPostForm } from "../createUpdateBlogPostForm";
import { TBlogPostRecordFormData } from "../dbBlogPostRecordUtils";

export const EditBlogPostScreen = (p: { blogPostId: string }) => {
  const blogPostRecordsStore = useBlogPostRecordsStore();
  const blogPost = blogPostRecordsStore.data?.find((x) => x.id === p.blogPostId);

  const blogPostImageRecordsStore = useBlogPostImageRecordsStore();

  const [blogPostFormData, setBlogPostFormData] = useState<TBlogPostRecordFormData | undefined>(
    blogPost,
  );

  if (!blogPost) return <div>Blog post not found</div>;

  return (
    <MainLayout>
      <div className="flex gap-6">
        <div className="flex-1">
          <CreateUpdateBlogPostForm
            blogPostRecord={blogPost}
            onChange={(x) => setBlogPostFormData(x)}
          />
        </div>

        <div className="flex flex-1 flex-col gap-4">
          <div>Preview</div>

          <DisplayBlogPost
            pb={pb}
            blogPost={blogPostFormData}
            blogPostImage={blogPostImageRecordsStore.data?.find(
              (x) => x.id === blogPostFormData?.blogPostImageId,
            )}
          />
        </div>
      </div>
    </MainLayout>
  );
};
