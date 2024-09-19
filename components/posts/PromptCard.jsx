"use client";

import Image from "next/image";
import { MdDeleteOutline as DeleteIcon } from "react-icons/md";
import { MdOutlineEdit as EditIcon } from "react-icons/md";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Link from "next/link";
import { BiUpvote as UpvoteIcon } from "react-icons/bi";
import { BiSolidUpvote as SolidUpvoteIcon } from "react-icons/bi";
import { GoLinkExternal as PostIcon } from "react-icons/go";
import Button from "../common/Button";
import Modal from "../common/Modal";
import { formatTimeAgo } from "@utils/date";

const PromptCard = ({
  post,
  feedPage,
  setFeedPage,
  filteredPosts,
  setFilteredPosts,
  posts,
}) => {
  // Variables
  const router = useRouter();
  const [showModal, setShowModal] = useState(false);
  const [postToDelete, setPostToDelete] = useState(null);
  const { data: session } = useSession();

  // Handlers
  const handleEdit = (postId) => {
    router.push(`/posts/edit/${postId}`);
  };
  const handleCopy = async (text) => {
    try {
      await navigator.clipboard.writeText(text);
      alert("Copied!");
    } catch (err) {
      console.log(err);
    }
  };
  const handleDelete = async () => {
    try {
      const response = await fetch("/api/posts/delete", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          postId: postToDelete,
        }),
      });
      const updatedPosts = posts.filter((post) => post._id !== postToDelete);
      if (filteredPosts) {
        const updatedFilteredPosts = filteredPosts.filter(
          (post) => post._id !== postToDelete
        );
        setFilteredPosts(updatedFilteredPosts);
      }
      setShowModal(false);
      const newTotalPages = Math.ceil(updatedPosts.length / 6);
      if (feedPage !== undefined && feedPage >= newTotalPages) {
        setFeedPage(0);
      }
      if (response.ok) {
        router.push("/");
      } else {
        throw new Error(data.error || "Something went wrong");
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handleShowModal = (postId) => {
    setPostToDelete(postId);
    setShowModal(true);
  };

  const handleUpvote = async (postId, method) => {
    try {
      // Optimistically update the UI first
      const updater = (post) => {
        if (post._id === postId) {
          if (method === "PUT") {
            // Add user ID to upvotes array
            return {
              ...post,
              upvotes: [...post.upvotes, session?.user.id],
            };
          } else {
            // Remove user ID from upvotes array
            return {
              ...post,
              upvotes: post.upvotes.filter((id) => id !== session?.user.id),
            };
          }
        }
        return post;
      };
      const updatedPosts = posts.map(updater);

      setPosts(updatedPosts);
      if (filteredPosts) {
        const updatedFilteredPosts = filteredPosts.map(updater);
        setFilteredPosts(updatedFilteredPosts);
      }

      // Fetch Request
      const body = JSON.stringify({
        userId: session?.user.id,
        postId: postId,
      });
      const response = await fetch(`/api/posts/upvote`, {
        method: method,
        headers: {
          "Content-Type": "application/json",
        },
        body: body,
      });
      if (!response.ok) {
        throw new Error(response.error || "Something went wrong");
      }
    } catch (error) {
      console.log(error);
      // Revert UI change if something goes wrong
      const reverter = (post) => {
        if (post._id === postId) {
          if (method === "PUT") {
            // Revert the optimistic UI change
            return {
              ...post,
              upvotes: post.upvotes.filter((id) => id !== session?.user.id),
            };
          } else {
            return {
              ...post,
              upvotes: [...post.upvotes, session?.user.id],
            };
          }
        }
        return post;
      };
      const revertedPosts = posts.map(reverter);
      setPosts(revertedPosts);
      if (filteredPosts) {
        const revertedFilteredPosts = filteredPosts.map(reverter);
        setFilteredPosts(revertedFilteredPosts);
      }
    }
  };

  return (
    <div
      className={`${post?.prompt.length > 300 ? "basis-full flex-grow" : "flex-grow basis-1/3"} max-md:w-full flex flex-col border-2 border-black/10 dark:border-white/30 rounded-lg p-4 gap-4 shadow-lg shadow-transparent hover:shadow-primary-orange/20 hover:border-primary-orange/35 transition-all duration-500 relative`}
      key={post._id}
    >
      {/* Copy Icon */}
      <div className="absolute top-6 right-4 group">
        <Link href={`/posts/${post._id}`}>
          <PostIcon className="text-base text-primary-orange cursor-pointer" />
        </Link>
        <span className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 opacity-0 group-hover:opacity-100 hidden group-hover:block transition-opacity duration-400 ease-out bg-primary-orange text-white text-xs rounded py-1 px-2 text-nowrap">
          Go To Post
        </span>
      </div>
      <div className="flex justify-start flex-row gap-4 flex-nowrap lg:flex-wrap xl:flex-nowrap">
        <Link
          href={`/profile/${post.creator?._id}`}
          className="flex items-center justify-center w-[60px] h-[60px]"
        >
          <Image
            src={post.creator?.image}
            alt={post.creator?.username || "Unknown User"}
            width={60}
            height={60}
            className="rounded-full"
          />
        </Link>
        <div className="flex flex-col flex-wrap w-full">
          <div className="flex flex-row gap-x-3 items-center">
            <Link
              href={`/profile/${post.creator?._id}`}
              className="text-lg font-bold capitalize text-pretty"
            >
              {post.creator?.username || "Anonymous"}
            </Link>
            <span className="font-bold mb-1">|</span>
            <span className="text-black/50 dark:text-white/50">
              {formatTimeAgo(post.createdAt)}
            </span>
          </div>
          <div className="relative group">
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

      <div className="flex items-center justify-start mt-2">
        <p
          className={`${post.prompt.length > 300 ? "text-base" : "text-lg"} text-pale-blue dark:text-white`}
        >
          {post.prompt}
        </p>
      </div>
      <div className="flex gap-x-2 gap-y-1 flex-wrap max-w-[70%]">
        {post.tags.map((tag, index) => (
          <span className="text-sm text-blue-500 font-semibold" key={index}>
            {tag}
          </span>
        ))}
      </div>
      <div className="flex items-center justify-between gap-4 my-4">
        <Button
          className={"rounded-full"}
          color={"orange"}
          onClick={() => handleCopy(post.prompt)}
        >
          Copy Prompt
        </Button>
        <div className="flex flex-row gap-4 items-center">
          {session?.user?.email === post.creator?.email && (
            <>
              <div className="relative group">
                <DeleteIcon
                  onClick={() => handleShowModal(post._id)}
                  className="text-base text-primary-orange cursor-pointer"
                ></DeleteIcon>
                <span className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 opacity-0 group-hover:opacity-100 hidden group-hover:block transition-opacity duration-400 ease-out bg-primary-orange text-white text-xs rounded py-1 px-2">
                  Delete
                </span>
              </div>
              <div className="relative group">
                <EditIcon
                  className="text-base text-primary-orange cursor-pointer"
                  onClick={() => handleEdit(post._id)}
                />
                <span className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 opacity-0 group-hover:opacity-100 hidden group-hover:block transition-opacity duration-400 ease-out bg-primary-orange text-white text-xs rounded py-1 px-2">
                  Edit
                </span>
              </div>
            </>
          )}
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
            <span className="text-lg text-primary-orange cursor-pointer">
              {post.upvotes?.length}
            </span>
            <span className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 opacity-0 group-hover:opacity-100 hidden group-hover:block transition-opacity duration-400 ease-out bg-primary-orange text-white text-xs rounded py-1 px-2">
              Upvote
            </span>
          </div>
        </div>
      </div>
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
