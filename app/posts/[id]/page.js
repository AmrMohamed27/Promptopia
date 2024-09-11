"use client";
import LoadingCircle from "@components/LoadingCircle";
import { useState, useEffect, useRef } from "react";
import PromptCard from "@components/PromptCard";
import Button from "@components/Button";
import Modal from "@components/Modal";
import { useSession } from "next-auth/react";
import { useFetchPosts } from "@components/PostsContext";
import CommentCard from "@components/CommentCard";

const Page = ({ params }) => {
  const { data: session } = useSession();
  const postId = params.id;
  const { posts, loading } = useFetchPosts();
  const post = posts.find((item) => item._id.toString() === postId);
  const [comment, setComment] = useState("");
  const [showModal, setShowModal] = useState(false);
  const textareaRef = useRef(null);

  const handleCommentChange = (e) => {
    setComment(e.target.value);
    textareaRef.current.style.height = "auto";
    textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
  };
  const handleSubmitComment = async (e) => {
    e.preventDefault();
    try {
      const newComment = {
        text: comment,
        creator: session.user.id,
      };
      const response = await fetch(`/api/posts/${postId}/comments`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newComment),
      });
      if (!response.ok) {
        throw new Error(response.statusText);
      }
      const data = await response.json();
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
      <div className="flex flex-col w-full mt-4 gap-16">
        <PromptCard post={post} />
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
          {console.log(post.comments[0])}
          {post?.comments && post.comments != [] ? (
            post.comments.map((comm) => (
              <CommentCard key={comm._id} comment={comm} postId={postId} />
            ))
          ) : (
            <p>No Comments</p>
          )}
        </div>
      </div>
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
