import { MainLayout } from "@/components/layout/Layout";
import { useBlogPostImageRecordsStore } from "../blogPostImageRecordsStore";
import { useBlogPostRecordsStore } from "../blogPostRecordsStore";
import { BlogPostSummaryCard } from "../BlogPostSummaryCard";

export const AllBlogPostsScreen = () => {
  const blogPostRecordsStore = useBlogPostRecordsStore();
  const blogPostImageRecordsStore = useBlogPostImageRecordsStore();

  const blogPostRecordsWithImage = (() => {
    if (blogPostRecordsStore.data === undefined) return undefined;
    if (blogPostRecordsStore.data === null) return null;

    return blogPostRecordsStore.data.map((blogPostRecord) => ({
      blogPostRecord,
      blogPostImageRecord: blogPostImageRecordsStore.data?.find(
        (blogPostImage) => blogPostImage.id === blogPostRecord.blogPostImageId,
      ),
    }));
  })();

  return (
    <MainLayout>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
        {(() => {
          if (blogPostRecordsWithImage === undefined) return <div>Loading...</div>;
          if (blogPostRecordsWithImage === null) return <div>Error</div>;
          if (blogPostRecordsWithImage.length === 0) return <div>No posts found</div>;

          return blogPostRecordsWithImage.map(({ blogPostRecord, blogPostImageRecord }) => (
            <BlogPostSummaryCard
              key={blogPostRecord.id}
              blogPostRecord={blogPostRecord}
              blogPostImageRecord={blogPostImageRecord}
            />
          ));
        })()}
        {}
      </div>
    </MainLayout>
  );
};
