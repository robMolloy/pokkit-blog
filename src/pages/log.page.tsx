import { useBlogPostImageRecordsStore } from "@/modules/blog/blogPostImageRecordsStore";
import { useBlogPostRecordsStore } from "@/modules/blog/blogPostRecordsStore";
import { useUsersStore } from "@/modules/users/usersStore";
import { useCurrentUserStore, useUnverifiedIsLoggedInStore } from "@/stores/authDataStore";

const LogPage = () => {
  const usersStore = useUsersStore();
  const currentUserStore = useCurrentUserStore();
  const unverifiedIsLoggedInStore = useUnverifiedIsLoggedInStore();
  const blogPostRecordsStore = useBlogPostRecordsStore();
  const blogPostImageRecordsStore = useBlogPostImageRecordsStore();

  return (
    <div>
      <pre>
        {JSON.stringify(
          {
            usersStore,
            currentUserStore,
            unverifiedIsLoggedInStore,
            blogPostImageRecordsStore,
            blogPostRecordsStore,
          },
          undefined,
          2,
        )}
      </pre>
    </div>
  );
};

export default LogPage;
