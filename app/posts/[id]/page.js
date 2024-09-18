"use client";
import LoadingCircle from "@components/common/LoadingCircle";
import { useState, useRef } from "react";
import PromptCard from "@components/posts/PromptCard";
import Button from "@components/common/Button";
import Modal from "@components/common/Modal";
import { useSession } from "next-auth/react";
import { useFetchPosts } from "@components/common/PostsContext";
import CommentCard from "@components/comments/CommentCard";

const Page = ({ params }) => {
  const { data: session } = useSession();
  const postId = params.id;
  const { posts, setPosts, loading } = useFetchPosts();
  const post = posts.find((item) => item._id == postId);
  const [comment, setComment] = useState("");
  const [showModal, setShowModal] = useState(false);
  const textareaRef = useRef(null);

  const handleCommentChange = (e) => {
    setComment(e.target.value);
    textareaRef.current.style.height = "auto";
    textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
  };

  const handleCommentDelete = (commentId) => {
    // Filter out the deleted comment
    const commentIndex = post.comments.findIndex(
      (c) =>
        c._id.toString() == commentId.toString() ||
        c.toString() == commentId.toString()
    );
    console.log("commentId: " + commentId);
    console.log(post.comments);
    console.log(commentIndex);
    if (commentIndex !== -1) {
      post.comments.splice(commentIndex, 1);
      // Update the posts state
      setPosts([...posts]);
    }
  };

  const handleSubmitComment = async (e) => {
    e.preventDefault();
    try {
      const newComment = {
        text: comment,
        creator: session?.user.id,
        createdAt: Date.now(),
        upvotes: [],
        replies: [],
      };
      const body = {
        newComment,
        postId: postId,
        user: {
          username: session?.user.name,
          _id: session?.user.id,
          image: session?.user.image,
          email: session?.user.email,
        },
      };
      const response = await fetch(`/api/posts/comment/create`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });
      if (!response.ok) {
        throw new Error(response.statusText);
      }
      const data = await response.json();
      console.log(data);
      post.comments.push(data);
      setComment("");
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    } catch (error) {
      console.error("Error submitting comment:", error);
    }
  };

  const handleCancel = (e) => {
    e.preventDefault();
    if (comment !== "") setShowModal(true);
  };

  const handleDiscardComment = (e) => {
    e.preventDefault();
    setComment("");
    textareaRef.current.style.height = "auto";
    textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    setShowModal(false);
  };
  return loading ? (
    <div className="min-h-screen">
      <LoadingCircle />
    </div>
  ) : (
    <div className="min-h-screen mt-10 mb-16">
      {post ? (
        <div className="flex flex-col w-full mt-4 gap-16">
          {post && <PromptCard post={post} />}
          <form className=" w-full mt-4">
            <div className="relative w-full flex-1 flex-col gap-8 border-2 border-black/10 dark:border-white/30 rounded-xl p-4">
              <textarea
                type="text"
                placeholder="Add a comment....."
                ref={textareaRef}
                className="flex-1 w-full bg-transparent outline-none text-black dark:text-white resize-none overflow-hidden"
                value={comment}
                onChange={handleCommentChange}
              />
              <div className="flex flex-row w-full justify-end mt-4 gap-4 items-center">
                <Button
                  color={"orange"}
                  className={"rounded-full"}
                  onClick={handleSubmitComment}
                >
                  Add Comment
                </Button>
                <Button
                  color={"blue"}
                  className={"rounded-full"}
                  onClick={handleCancel}
                >
                  Cancel
                </Button>
              </div>
            </div>
          </form>
          <div className="flex flex-col gap-8">
            {post?.comments && post.comments != [] ? (
              post.comments.map((comm) => (
                <CommentCard
                  key={comm._id}
                  comment={comm}
                  postId={postId}
                  textareaRef={textareaRef}
                  handleCommentDelete={handleCommentDelete}
                />
              ))
            ) : (
              <p>No Comments</p>
            )}
          </div>
        </div>
      ) : (
        <div>Post does not exist</div>
      )}
      {showModal && (
        <Modal
          message={
            "You have a comment in progress. Do you really want to discard it?"
          }
          confirmText="Discard"
          handleConfirm={handleDiscardComment}
          handleCancel={() => setShowModal(false)}
        />
      )}
    </div>
  );
};

export default Page;
