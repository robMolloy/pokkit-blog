import { CustomIcon } from "@/components/CustomIcon";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { pb } from "@/config/pocketbaseConfig";
import { useRouter } from "next/router";
import { TBlogPostImageRecord } from "./dbBlogPostImageRecordUtils";
import { TBlogPostRecord } from "./dbBlogPostRecordUtils";
import { markdownLinksToPlainText } from "./markdownUtils";

export const BlogPostSummaryCard = (p: {
  blogPostRecord: TBlogPostRecord;
  blogPostImageRecord?: TBlogPostImageRecord;
}) => {
  const router = useRouter();

  return (
    <Card
      className="flex cursor-pointer flex-col gap-4 overflow-hidden border-0 shadow-md transition-shadow duration-300 hover:bg-secondary hover:shadow-lg"
      onClick={() => router.push(`/admin/blog-post/${p.blogPostRecord.id}`)}
    >
      {p.blogPostImageRecord && (
        <div className="overflow-hidden">
          <img
            src={pb.files.getURL(p.blogPostImageRecord, p.blogPostImageRecord.imageUrl)}
            alt={p.blogPostRecord.title}
            className="object-cover transition-transform"
          />
        </div>
      )}
      <CardHeader className="flex flex-col gap-2 py-0">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <CustomIcon iconName="Calendar" size="sm" />
          {p.blogPostRecord.updated}
        </div>
        <CardTitle className="cursor-pointer text-xl leading-tight transition-colors">
          {p.blogPostRecord.title}
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="line-clamp-4 h-24 leading-6">
          {markdownLinksToPlainText(p.blogPostRecord.subtitle)}
        </div>
      </CardContent>
    </Card>
  );
};
