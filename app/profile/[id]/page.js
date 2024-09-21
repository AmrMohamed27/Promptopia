import { fetchUser, fetchPosts } from "@utils/api/fetch";
import ProfilePage from "@components/profile/ProfilePage";

const Page = async ({ params }) => {
  const id = params.id;
  const user = await fetchUser(id);
  const posts = await fetchPosts();
  return (
    <section className="w-full min-h-screen mb-12">
      {user === undefined ? (
        <div className="flex flex-col gap-8 w-full py-8 md:py-16 px-4 md:px-8">
          <h1 className="text-3xl md:text-4xl font-bold text-blue-600">
            User doesn&apos;t exist
          </h1>
        </div>
      ) : (
        <>
          <ProfilePage user={user} posts={posts} />
        </>
      )}
    </section>
  );
};

export default Page;
