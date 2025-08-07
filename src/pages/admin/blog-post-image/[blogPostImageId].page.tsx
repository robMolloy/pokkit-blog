import { DisplayBlogPostImageScreen } from "@/modules/blog/screens/DisplayBlogPostImageScreen";
import { useRouter } from "next/router";

export default function Page() {
  const router = useRouter();
  const blogPostImageId = router.query.blogPostImageId as string;

  return <DisplayBlogPostImageScreen blogPostImageId={blogPostImageId} />;
}
