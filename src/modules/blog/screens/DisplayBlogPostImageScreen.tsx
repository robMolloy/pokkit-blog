import { MainLayout } from "@/components/layout/Layout";
import { pb } from "@/config/pocketbaseConfig";
import { useBlogPostImageRecordsStore } from "../blogPostImageRecordsStore";
import { DisplayBlogPostImage } from "../DisplayBlogPostImage";

export const DisplayBlogPostImageScreen = (p: { blogPostImageId: string }) => {
  const blogPostImageRecordsStore = useBlogPostImageRecordsStore();
  const blogPostImageRecord = blogPostImageRecordsStore.data?.find(
    (x) => x.id === p.blogPostImageId,
  );

  return (
    <MainLayout>
      {blogPostImageRecord && (
        <DisplayBlogPostImage pb={pb} blogPostImageRecord={blogPostImageRecord} />
      )}
      {!blogPostImageRecord && <div>No blog post image found</div>}
    </MainLayout>
  );
};
