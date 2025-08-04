import { CustomIcon } from "@/components/CustomIcon";
import { MainLayout } from "@/components/layout/Layout";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useRouter } from "next/router";
import { useBlogPostRecordsStore } from "../blogPostRecordsStore";

export const AllBlogPostsScreen = () => {
  const router = useRouter();

  const blogPostRecordsStore = useBlogPostRecordsStore();

  return (
    <MainLayout>
      <div className="grid grid-cols-3 gap-6">
        {(() => {
          if (blogPostRecordsStore.data === undefined) return <div>Loading...</div>;
          if (blogPostRecordsStore.data === null) return <div>Error</div>;
          if (blogPostRecordsStore.data.length === 0) return <div>No posts found</div>;
          return blogPostRecordsStore.data.map((post) => (
            <Card
              key={post.id}
              className="cursor-pointer overflow-hidden border-0 shadow-md transition-shadow duration-300 hover:bg-secondary hover:shadow-lg"
              onClick={() => router.push(`/admin/blog-post/${post.id}`)}
            >
              <div className="aspect-video overflow-hidden">
                <img
                  src="http://localhost:3000/test.png"
                  alt={post.title}
                  className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
                />
              </div>
              <CardHeader className="pb-4">
                <div className="mb-3 flex items-center gap-2">
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <CustomIcon iconName="Calendar" size="sm" />
                      {post.updated}
                    </span>
                  </div>
                </div>
                <CardTitle className="cursor-pointer text-xl leading-tight transition-colors">
                  {post.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="mt-2 text-base">{post.content.slice(0, 100)}</CardContent>
              <CardFooter className="pb-2 pt-0">asd</CardFooter>
            </Card>
          ));
        })()}
        {}
      </div>
    </MainLayout>
  );
};
