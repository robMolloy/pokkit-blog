import { pb } from "@/config/pocketbaseConfig";
import { useBlogPostRecordsStore } from "../blogPostRecordsStore";
import { DisplayBlogPost } from "../DisplayBlogPost";
import { useBlogPostImageRecordsStore } from "../blogPostImageRecordsStore";
import { MainLayout } from "@/components/layout/Layout";

export const DisplayBlogPostScreen = (p: { blogPostId: string }) => {
  const blogPostRecordsStore = useBlogPostRecordsStore();
  const blogPost = blogPostRecordsStore.data?.find((x) => x.id === p.blogPostId);

  const blogPostImageRecordsStore = useBlogPostImageRecordsStore();
  const blogPostImageRecord = blogPostImageRecordsStore.data?.find(
    (x) => x.id === blogPost?.blogPostImageId,
  );

  return (
    <MainLayout>
      <DisplayBlogPost pb={pb} blogPost={blogPost} blogPostImage={blogPostImageRecord} />
    </MainLayout>
  );
};
