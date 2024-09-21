"use client";

import Image from "next/image";
import { MdDeleteOutline as DeleteIcon } from "react-icons/md";
import { MdOutlineEdit as EditIcon } from "react-icons/md";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useMemo, useEffect } from "react";
import Link from "next/link";
import { BiUpvote as UpvoteIcon } from "react-icons/bi";
import { BiSolidUpvote as SolidUpvoteIcon } from "react-icons/bi";
import { GoLinkExternal as PostIcon } from "react-icons/go";
import Button from "../common/Button";
import Modal from "../common/Modal";
import { formatTimeAgo } from "@utils/date";
import { useUpvotePost } from "@hooks/useUpvotePost";
import { useDeletePost } from "@hooks/useDeletePost";

const PromptCard = ({
  post: initialPost,
  posts,
  filteredPosts,
  setFilteredPosts,
}) => {
  // Variables
  const router = useRouter();
  const { data: session } = useSession();

  // Custom Hooks
  const { posts: upvotePosts, handleUpvote } = useUpvotePost(
    filteredPosts,
    session
  );
  const {
    posts: deletePosts,
    handleShowModal,
    showModal,
    setShowModal,
    handleDelete,
  } = useDeletePost(filteredPosts, setFilteredPosts);

  // Find the updated post from either upvotePosts or deletePosts
  const post = useMemo(() => {
    return (
      upvotePosts?.find((p) => p._id === initialPost._id) ||
      deletePosts?.find((p) => p._id === initialPost._id) ||
      initialPost
    );
  }, [initialPost, upvotePosts, deletePosts]);

  useEffect(() => {
    setFilteredPosts(upvotePosts || deletePosts || posts);
  }, [deletePosts, upvotePosts, posts, setFilteredPosts]);

  // Handlers
  const handleCopy = async (text) => {
    try {
      await navigator.clipboard.writeText(text);
      alert("Copied!");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div
      className={`${post?.prompt.length > 300 ? "basis-full flex-grow" : "flex-grow basis-[48%] flex-shrink"} max-md:w-full flex flex-col border-2 border-black/10 dark:border-white/30 rounded-lg p-4 gap-4 shadow-lg shadow-transparent hover:shadow-primary-orange/20 hover:border-primary-orange/35 transition-all duration-500 relative`}
      key={post._id}
    >
      {/* Go To Post Icon */}
      <div className="absolute top-6 right-4 group">
        <Link href={`/posts/${post._id}`}>
          <PostIcon className="text-base text-primary-orange cursor-pointer" />
        </Link>
        <span className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 opacity-0 group-hover:opacity-100 hidden group-hover:block transition-opacity duration-400 ease-out bg-primary-orange text-white text-xs rounded py-1 px-2 text-nowrap">
          Go To Post
        </span>
      </div>
      {/* Creator Section */}
      <div className="flex justify-start flex-row gap-4 flex-nowrap ">
        {/* Creator Image */}
        <Link
          href={`/profile/${post.creator?._id}`}
          className="flex items-center justify-center rounded-full aspect-square"
        >
          <Image
            src={post.creator?.image}
            alt={post.creator?.username || "Unknown User"}
            width={50}
            height={50}
            className="rounded-full aspect-square"
          />
        </Link>
        {/* Creator Info and Post Date */}
        <div className="flex flex-col flex-wrap w-full">
          <div className="flex flex-col lg:flex-row gap-x-3 lg:items-center">
            <Link
              href={`/profile/${post.creator?._id}`}
              className="text-lg font-bold capitalize text-pretty"
            >
              {`${post.creator?.username.slice(0, 18)}${post.creator?.username.length > 17 ? "..." : ""}` ||
                "Anonymous"}
            </Link>
            <div className="flex gap-x-3 items-center">
              <span className="font-bold mb-1 hidden lg:block">|</span>
              <span className="text-black/50 dark:text-white/50">
                {formatTimeAgo(post.createdAt)}
              </span>
            </div>
          </div>
          {/* Creator Email */}
          <div className="relative group hidden lg:block">
            <p
              className="text-md text-black/60 dark:text-white/40 italic underline cursor-pointer"
              onClick={() => handleCopy(post.creator?.email)}
            >
              {post.creator?.email || "Anonymous@anon.com"}
            </p>
            <span className="absolute top-full left-0 mb-2 opacity-0 group-hover:opacity-100 hidden group-hover:block transition-opacity duration-400 ease-out bg-primary-orange text-white text-xs rounded py-1 px-2">
              Click to copy Email
            </span>
          </div>
        </div>
      </div>
      {/* Prompt */}
      <div className="flex items-center justify-start mt-2">
        <p
          className={`${post.prompt.length > 300 ? "text-base" : "text-lg"} text-pale-blue dark:text-white`}
        >
          {post.prompt}
        </p>
      </div>
      {/* Tags */}
      <div className="flex gap-x-2 gap-y-1 flex-wrap max-w-[70%]">
        {post.tags.map((tag, index) => (
          <span className="text-sm text-blue-500 font-semibold" key={index}>
            {tag}
          </span>
        ))}
      </div>
      {/* Buttons */}
      <div className="flex items-center justify-between gap-4 my-4">
        {/* Copy Prompt Button */}
        <Button
          className={"rounded-full"}
          color={"orange"}
          onClick={() => handleCopy(post.prompt)}
        >
          Copy Prompt
        </Button>
        {/* Icons */}
        <div className="flex flex-row gap-4 items-center">
          {session?.user?.email === post.creator?.email && (
            <>
              {/* Delete Post Button */}
              <div className="relative group">
                <DeleteIcon
                  onClick={() => handleShowModal(post._id)}
                  className="text-base text-primary-orange cursor-pointer"
                ></DeleteIcon>
                <span className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 opacity-0 group-hover:opacity-100 hidden group-hover:block transition-opacity duration-400 ease-out bg-primary-orange text-white text-xs rounded py-1 px-2">
                  Delete
                </span>
              </div>
              {/* Edit Post Button */}
              <div className="relative group">
                <Link href={`/posts/edit/${post._id}`}>
                  <EditIcon className="text-base text-primary-orange cursor-pointer" />
                </Link>
                <span className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 opacity-0 group-hover:opacity-100 hidden group-hover:block transition-opacity duration-400 ease-out bg-primary-orange text-white text-xs rounded py-1 px-2">
                  Edit
                </span>
              </div>
            </>
          )}
          {/* Upvote Button */}
          <div className="relative group flex flex-row gap-2 items-center">
            {session?.user?.id ? (
              post.upvotes?.includes(session?.user?.id) ? (
                <SolidUpvoteIcon
                  className="text-base text-primary-orange cursor-pointer"
                  onClick={() => handleUpvote(post._id, "DELETE")}
                />
              ) : (
                <UpvoteIcon
                  className="text-base text-primary-orange cursor-pointer"
                  onClick={() => handleUpvote(post._id, "PUT")}
                />
              )
            ) : (
              <UpvoteIcon
                className="text-xl text-primary-orange cursor-pointer"
                onClick={() => alert("Please sign in to upvote")}
              />
            )}
            {/* Upvote Count */}
            <span className="text-lg text-primary-orange cursor-pointer">
              {post.upvotes?.length}
            </span>
            <span className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 opacity-0 group-hover:opacity-100 hidden group-hover:block transition-opacity duration-400 ease-out bg-primary-orange text-white text-xs rounded py-1 px-2">
              Upvote
            </span>
          </div>
        </div>
      </div>
      {/* Delete Post Modal */}
      {showModal && (
        <Modal
          message={
            "Do you really want to delete this post? This action cannot be undone."
          }
          confirmText={"Delete"}
          handleConfirm={handleDelete}
          handleCancel={() => setShowModal(false)}
        />
      )}
    </div>
  );
};

export default PromptCard;
