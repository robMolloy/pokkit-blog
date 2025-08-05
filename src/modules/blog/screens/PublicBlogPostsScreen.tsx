import { MainLayout } from "@/components/layout/Layout";
import { useBlogPostImageRecordsStore } from "../blogPostImageRecordsStore";
import { useBlogPostRecordsStore } from "../blogPostRecordsStore";
import { BlogPostSummaryCard } from "../BlogPostSummaryCard";
import { useRouter } from "next/router";
import { BlogPostSummariesGrid } from "../BlogPostSummmariesGrid";

export const PublicBlogPostsScreen = () => {
  const router = useRouter();

  const blogPostRecordsStore = useBlogPostRecordsStore();
  const blogPostImageRecordsStore = useBlogPostImageRecordsStore();

  const blogPostRecordsWithImage = (() => {
    if (blogPostRecordsStore.data === undefined) return undefined;
    if (blogPostRecordsStore.data === null) return null;

    return blogPostRecordsStore.data
      .filter((x) => !!x.publishedAt)
      .map((blogPostRecord) => ({
        blogPostRecord,
        blogPostImageRecord: blogPostImageRecordsStore.data?.find(
          (blogPostImage) => blogPostImage.id === blogPostRecord.blogPostImageId,
        ),
      }));
  })();

  return (
    <MainLayout>
      {(() => {
        if (blogPostRecordsWithImage === undefined) return <div>Loading...</div>;
        if (blogPostRecordsWithImage === null) return <div>Error</div>;
        if (blogPostRecordsWithImage.length === 0) return <div>No posts found</div>;

        return (
          <BlogPostSummariesGrid>
            {blogPostRecordsWithImage.map(({ blogPostRecord, blogPostImageRecord }) => (
              <BlogPostSummaryCard
                key={blogPostRecord.id}
                onClick={() => router.push(`/admin/blog-post/${blogPostRecord.id}`)}
                blogPostRecord={blogPostRecord}
                blogPostImageRecord={blogPostImageRecord}
              />
            ))}
          </BlogPostSummariesGrid>
        );
      })()}
    </MainLayout>
  );
};
