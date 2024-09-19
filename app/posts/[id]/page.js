import PromptCard from "@components/posts/PromptCard";
import CommentCard from "@components/comments/CommentCard";
import { fetchPostById } from "@utils/api/fetch";
import CommentForm from "@components/comments/CommentForm";
import PostPage from "@components/posts/PostPage";

const Page = async ({ params }) => {
  const postId = params.id;
  const initialPost = await fetchPostById(postId);
  return (
    <div className="min-h-screen mt-10 mb-16">
      {initialPost ? (
        <PostPage initialPost={initialPost} />
      ) : (
        <div>Post does not exist</div>
      )}
    </div>
  );
};

export default Page;
