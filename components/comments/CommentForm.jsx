"use client";

import Button from "@components/common/Button";
import { useRef, useState } from "react";
import Modal from "@components/common/Modal";
import { useSession } from "next-auth/react";

const CommentForm = ({ post, setPost }) => {
  const textareaRef = useRef(null);
  const { data: session } = useSession();
  const postId = post._id;
  const [comment, setComment] = useState("");
  const [showModal, setShowModal] = useState(false);

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
      setPost((prev) => ({ ...prev, comments: [...prev.comments, data] }));
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

  return (
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
    </form>
  );
};

export default CommentForm;
