import Image from "next/image";
import { BiUpvote as UpvoteIcon } from "react-icons/bi";
import { BiSolidUpvote as SolidUpvoteIcon } from "react-icons/bi";
import { useState } from "react";
import { formatTimeAgo } from "@utils/date";
import { useSession } from "next-auth/react";
import { MdDeleteOutline as DeleteIcon } from "react-icons/md";
import Modal from "./Modal";

const CommentCard = ({ comment, postId, textareaRef, handleCommentDelete }) => {
  const { text, creator, createdAt, upvotes, _id: commentId } = comment;
  const { data: session } = useSession();
  const [upvotesLength, setUpvotesLength] = useState(upvotes?.length || 0);
  const [hasUpvoted, setHasUpvoted] = useState(
    upvotes?.some((arr) => arr.includes(session?.user.id)) || false
  );
  const [showModal, setShowModal] = useState(false);

  const handleUpvote = async (method) => {
    try {
      // Fetch Request
      method === "PUT"
        ? upvotes.push(session?.user.id)
        : upvotes.splice(upvotes.indexOf(session?.user.id), 1);
      const body = JSON.stringify({
        comment: comment,
        postId: postId,
      });
      const response = await fetch(`/api/posts/comment/edit`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: body,
      });
      if (!response.ok) {
        throw new Error(response.error || "Something went wrong");
      } else {
        const updatedComment = await response.json();
        console.log(updatedComment.upvotes);
        if (
          (method === "PUT" &&
            updatedComment.upvotes.includes(session?.user?.id)) ||
          (method === "DELETE" &&
            !updatedComment.upvotes.includes(session?.user?.id))
        ) {
          setUpvotesLength((prev) => (method === "PUT" ? prev + 1 : prev - 1));
          setHasUpvoted(!hasUpvoted);
        } else {
          alert("An error has occured");
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async () => {
    try {
      // Fetch Request
      const body = JSON.stringify({
        commentId: commentId,
        postId: postId,
      });
      const response = await fetch(`/api/posts/comment/delete`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: body,
      });
      if (!response.ok) {
        throw new Error(response.error || "Something went wrong");
      } else {
        handleCommentDelete(commentId);
        setShowModal(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex flex-col gap-4 border-2 border-black/10 dark:border-white/30 rounded-lg p-4 relative">
      <>
        <div className="flex flex-row gap-8 items-center">
          <div className="rounded-full">
            <Image
              src={creator.image}
              alt={creator.username}
              width={50}
              height={50}
              className="rounded-full"
            />
          </div>
          <div className="flex flex-row gap-4 items-center">
            <span className="font=bold capitalize text-lg">
              {creator.username}
            </span>
            <span>|</span>
            <span className="text-black/50 dark:text-white/50">
              {formatTimeAgo(createdAt)}
            </span>
          </div>
        </div>
        <div className="w-full">
          <p>{text}</p>
        </div>
        <div className="flex flex-row gap-4 items-center justify-end">
          <div className="flex flex-row gap-2 items-center justify-center ">
            <div className="hover:bg-black/10 dark:hover:bg-white/10 rounded-full flex items-center justify-center p-2 cursor-pointer">
              {session?.user?.id ? (
                hasUpvoted ? (
                  <SolidUpvoteIcon
                    className="text-base text-primary-orange cursor-pointer"
                    onClick={() => handleUpvote("DELETE")}
                  />
                ) : (
                  <UpvoteIcon
                    className="text-base text-primary-orange cursor-pointer"
                    onClick={() => handleUpvote("PUT")}
                  />
                )
              ) : (
                <UpvoteIcon
                  className="text-xl text-primary-orange cursor-pointer"
                  onClick={() => alert("Please sign in to upvote")}
                />
              )}
            </div>
            <span className="text-primary-orange">{upvotesLength}</span>
          </div>
          {creator._id === session?.user?.id && commentId !== undefined && (
            <div
              className="flex items-center justify-center rounded-full p-2 hover:bg-black/10 dark:hover:bg-white/10 cursor-pointer"
              onClick={() => setShowModal(true)}
            >
              <DeleteIcon className="text-lg text-primary-orange cursor-pointer" />
            </div>
          )}
        </div>
      </>
      {showModal && (
        <Modal
          message={
            "Do you really want to delete this comment? This action cannot be undone."
          }
          confirmText={"Delete"}
          handleConfirm={handleDelete}
          handleCancel={() => setShowModal(false)}
        />
      )}
    </div>
  );
};

export default CommentCard;
