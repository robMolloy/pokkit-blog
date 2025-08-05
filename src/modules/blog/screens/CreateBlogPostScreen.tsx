import { MainLayout } from "@/components/layout/Layout";
import { pb } from "@/config/pocketbaseConfig";
import { DisplayBlogPost } from "../DisplayBlogPost";
import { useBlogPostImageRecordsStore } from "../blogPostImageRecordsStore";
import { CreateUpdateBlogPostForm } from "../createUpdateBlogPostForm";
import { useState } from "react";
import { TBlogPostRecordFormData } from "../dbBlogPostRecordUtils";

export const CreateBlogPostScreen = () => {
  const blogPostImageRecordsStore = useBlogPostImageRecordsStore();

  const [blogPostFormData, setBlogPostFormData] = useState<TBlogPostRecordFormData | undefined>();

  return (
    <MainLayout>
      <div className="flex gap-6">
        <div className="flex-1">
          <CreateUpdateBlogPostForm
            blogPostImageRecords={blogPostImageRecordsStore.data ?? []}
            blogPostRecord={undefined}
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
