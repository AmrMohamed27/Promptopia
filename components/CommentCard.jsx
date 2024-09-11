import Image from "next/image";
import { BiUpvote as UpvoteIcon } from "react-icons/bi";
import { BiSolidUpvote as SolidUpvoteIcon } from "react-icons/bi";
import { FaRegMessage as ReplyIcon } from "react-icons/fa6";
import { useState, useEffect } from "react";
import { formatTimeAgo } from "@utils/date";
import LoadingCircle from "./LoadingCircle";
import { useSession } from "next-auth/react";

const CommentCard = ({ comment, postId }) => {
  const {
    text,
    creator,
    createdAt,
    upvotes,
    replies,
    _id: commentId,
  } = comment;
  const { data: session } = useSession();
  const [creatorUser, setCreatorUser] = useState({});
  const [loading, setLoading] = useState(true);
  const [upvotesLength, setUpvotesLength] = useState(upvotes.length);
  const [hasUpvoted, setHasUpvoted] = useState(
    upvotes.some((arr) => arr.includes(session?.user.id))
  );
  useEffect(() => {
    // Fetch user from id
    const fetchUser = async () => {
      try {
        const res = await fetch(`/api/user/${creator}`);
        if (!res.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await res.json();
        setCreatorUser(data);
      } catch (error) {
        console.error("Error fetching user:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, [creator]);

  const handleUpvote = async (method) => {
    try {
      // Fetch Request
      const body = JSON.stringify({
        userId: session?.user.id,
        commentId: commentId,
      });
      const response = await fetch(`/api/posts/${postId}/comments/upvote`, {
        method: method,
        headers: {
          "Content-Type": "application/json",
        },
        body: body,
      });
      if (!response.ok) {
        throw new Error(response.error || "Something went wrong");
      } else {
        const updatedComment = await response.json();
        console.log(updatedComment);
        setUpvotesLength(updatedComment.upvotes.length);
        setHasUpvoted(!hasUpvoted);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex flex-col gap-4 border-2 border-black/10 dark:border-white/30 rounded-lg p-4 relative">
      {loading ? (
        <LoadingCircle />
      ) : (
        <>
          <div className="flex flex-row gap-8 items-center">
            <div className="rounded-full">
              <Image
                src={creatorUser.image}
                alt={creatorUser.username}
                width={50}
                height={50}
                className="rounded-full"
              />
            </div>
            <div className="flex flex-row gap-4 items-center">
              <span className="font=bold capitalize text-lg">
                {creatorUser.username}
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
              <div className="hover:bg-black/10 dark:hover:bg-white/10 rounded-full flex items-center justify-center p-2">
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
              <span>{upvotesLength}</span>
            </div>
            <div className="flex flex-row gap-2 items-center justify-center rounded-full px-6 py-2 hover:bg-black/10 dark:hover:bg-white/10 cursor-pointer">
              <ReplyIcon className="text-lg text-primary-orange cursor-pointer" />
              <span>Reply</span>
            </div>
          </div>
          <div>
            {replies.map((reply) => (
              <CommentCard
                key={reply._id}
                text={reply.text}
                creator={reply.creator}
                upvotes={reply.upvotes}
                replies={reply.replies}
                createdAt={reply.createdAt}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default CommentCard;
