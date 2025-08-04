import { EditBlogPostScreen } from "@/modules/blog/screens/EditBlogPostScreen";
import { useRouter } from "next/router";

export default function Page() {
  const router = useRouter();
  const blogPostId = router.query.blogPostId as string;

  return <EditBlogPostScreen blogPostId={blogPostId} />;
}
