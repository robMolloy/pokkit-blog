import { PocketBase } from "@/config/pocketbaseConfig";
import { TBlogPostImageRecord } from "./dbBlogPostImageRecordUtils";
import { DisplayMarkdown } from "./DisplayMarkdown";

export const DisplayBlogPostImage = (p: {
  pb: PocketBase;
  blogPostImageRecord: TBlogPostImageRecord;
}) => {
  return (
    <DisplayMarkdown>{`![an image](${p.pb.files.getURL(p.blogPostImageRecord, p.blogPostImageRecord.imageUrl)})`}</DisplayMarkdown>
  );
};
