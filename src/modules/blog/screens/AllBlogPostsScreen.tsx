import { CustomIcon } from "@/components/CustomIcon";
import { MainLayout } from "@/components/layout/Layout";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useRouter } from "next/router";
import { useBlogPostRecordsStore } from "../blogPostRecordsStore";
import { useBlogPostImageRecordsStore } from "../blogPostImageRecordsStore";
import { pb } from "@/config/pocketbaseConfig";

export const AllBlogPostsScreen = () => {
  const router = useRouter();

  const blogPostRecordsStore = useBlogPostRecordsStore();
  const blogPostImageRecordsStore = useBlogPostImageRecordsStore();

  const blogPostRecordsWithImage = (() => {
    if (blogPostRecordsStore.data === undefined) return undefined;
    if (blogPostRecordsStore.data === null) return null;

    return blogPostRecordsStore.data.map((blogPost) => ({
      blogPost,
      blogPostImage: blogPostImageRecordsStore.data?.find(
        (blogPostImage) => blogPostImage.id === blogPost.blogPostImageId,
      ),
    }));
  })();

  return (
    <MainLayout>
      <div className="grid grid-cols-3 gap-6">
        {(() => {
          if (blogPostRecordsWithImage === undefined) return <div>Loading...</div>;
          if (blogPostRecordsWithImage === null) return <div>Error</div>;
          if (blogPostRecordsWithImage.length === 0) return <div>No posts found</div>;
          return blogPostRecordsWithImage.map(({ blogPost, blogPostImage }) => (
            <Card
              key={blogPost.id}
              className="cursor-pointer overflow-hidden border-0 shadow-md transition-shadow duration-300 hover:bg-secondary hover:shadow-lg"
              onClick={() => router.push(`/admin/blog-post/${blogPost.id}`)}
            >
              {blogPostImage && (
                <div className="overflow-hidden">
                  <img
                    src={pb.files.getURL(blogPostImage, blogPostImage.imageUrl)}
                    alt={blogPost.title}
                    className="object-cover transition-transform"
                  />
                </div>
              )}
              <CardHeader className="pb-4">
                <div className="mb-3 flex items-center gap-2">
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <CustomIcon iconName="Calendar" size="sm" />
                      {blogPost.updated}
                    </span>
                  </div>
                </div>
                <CardTitle className="cursor-pointer text-xl leading-tight transition-colors">
                  {blogPost.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="mt-2 text-base">{blogPost.content.slice(0, 100)}</CardContent>
              <CardFooter className="pb-2 pt-0">asd</CardFooter>
            </Card>
          ));
        })()}
        {}
      </div>
    </MainLayout>
  );
};
