import { DisplayBlogPostScreen } from "@/modules/blog/screens/DisplayBlogPostScreen";
import { useRouter } from "next/router";

export default function Page() {
  const router = useRouter();
  const blogPostId = router.query.blogPostId as string;

  return <DisplayBlogPostScreen blogPostId={blogPostId} />;
}
