import { Card } from "@/components/ui/card";
import { pb } from "@/config/pocketbaseConfig";
import { TBlogPostImageRecord } from "./dbBlogPostImageRecordUtils";

export const BlogPostImageSummaryCard = (p: {
  blogPostImageRecord: TBlogPostImageRecord;
  onClick: () => void;
}) => {
  return (
    <Card
      className="flex cursor-pointer flex-col gap-4 overflow-hidden border-0 shadow-md transition-shadow duration-300 hover:bg-secondary hover:shadow-lg"
      onClick={() => p.onClick()}
    >
      <div>
        <img
          src={pb.files.getURL(p.blogPostImageRecord, p.blogPostImageRecord.imageUrl)}
          alt={"an image"}
          className="object-cover transition-transform"
        />
      </div>
    </Card>
  );
};
