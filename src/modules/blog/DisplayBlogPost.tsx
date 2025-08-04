import { PocketBase } from "@/config/pocketbaseConfig";
import { TBlogPostImageRecord } from "./dbBlogPostImageRecordUtils";
import { TBlogPostRecordFormData } from "./dbBlogPostRecordUtils";
import { DisplayMarkdown } from "./DisplayMarkdown";

export const DisplayBlogPost = (p: {
  pb: PocketBase;
  blogPost?: TBlogPostRecordFormData;
  blogPostImage?: TBlogPostImageRecord;
}) => {
  return (
    <DisplayMarkdown>{`# ${p.blogPost?.title}
## ${p.blogPost?.subtitle}
${p.blogPostImage ? `![${p.blogPost?.blogPostImageCaption}](${p.pb.files.getURL(p.blogPostImage, p.blogPostImage.imageUrl)})` : ""}
${p.blogPost?.content}
`}</DisplayMarkdown>
  );
};
