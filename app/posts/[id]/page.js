import { fetchPostById, fetchPosts } from "@utils/api/fetch";
import PostPage from "@components/posts/PostPage";

const Page = async ({ params }) => {
  const postId = params.id;
  const initialPost = await fetchPostById(postId);
  const initialPosts = await fetchPosts();
  return (
    <div className="min-h-screen mt-10 mb-16">
      {initialPost ? (
        <PostPage initialPost={initialPost} initialPosts={initialPosts} />
      ) : (
        <div>Post does not exist</div>
      )}
    </div>
  );
};

export default Page;
