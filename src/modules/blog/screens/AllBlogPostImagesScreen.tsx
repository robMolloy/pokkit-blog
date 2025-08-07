import { MainLayout } from "@/components/layout/Layout";
import { useBlogPostImageRecordsStore } from "../blogPostImageRecordsStore";
import { H1 } from "@/components/ui/defaultComponents";
import { BlogPostSummariesGrid } from "../BlogPostSummmariesGrid";
import { BlogPostImageSummaryCard } from "../BlogPostImageSummaryCard";
import { useRouter } from "next/router";

export const AllBlogPostImagesScreen = () => {
  const blogPostImageRecordsStore = useBlogPostImageRecordsStore();
  const router = useRouter();

  return (
    <MainLayout>
      <H1>All Blog Post Images</H1>
      {(() => {
        if (blogPostImageRecordsStore.data === null) return <>Error</>;
        if (blogPostImageRecordsStore.data === undefined) return <>Loading...</>;
        if (blogPostImageRecordsStore.data.length === 0) return <>No blog post images</>;

        return (
          <BlogPostSummariesGrid>
            {blogPostImageRecordsStore.data.map((blogPostImageRecord) => (
              <BlogPostImageSummaryCard
                onClick={() => router.push(`/admin/blog-post-image/${blogPostImageRecord.id}`)}
                key={blogPostImageRecord.id}
                blogPostImageRecord={blogPostImageRecord}
              />
            ))}
          </BlogPostSummariesGrid>
        );
        return;
      })()}
    </MainLayout>
  );
};
