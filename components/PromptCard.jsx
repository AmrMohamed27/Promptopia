"use client";

import Image from "next/image";
import { MdDeleteOutline as DeleteIcon } from "react-icons/md";
import { MdOutlineEdit as EditIcon } from "react-icons/md";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Link from "next/link";

const PromptCard = ({
  post,
  feedPage,
  setFeedPage,
  posts,
  setPosts,
  index,
}) => {
  const router = useRouter();
  const [showModal, setShowModal] = useState(false);
  const [postToDelete, setPostToDelete] = useState(null);
  const { data: session } = useSession();
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
      setPosts(updatedPosts);
      setShowModal(false);
      const newTotalPages = Math.ceil(updatedPosts.length / 6);
      if (feedPage >= newTotalPages) {
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
  return (
    <div
      className={`${post.prompt.length > 300 ? "basis-full flex-grow" : "flex-grow basis-1/4"} max-md:w-full flex flex-col border-2 border-black/10 rounded-lg p-4 gap-4 shadow-lg shadow-transparent hover:shadow-primary-orange/20 hover:border-primary-orange/35 transition-all duration-500`}
      key={post._id}
    >
      <div className="flex justify-start flex-row gap-4 flex-nowrap lg:flex-wrap xl:flex-nowrap">
        <Link
          href={`/profile/${post.creator?._id}`}
          className="flex items-center justify-center"
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
          <Link
            href={`/profile/${post.creator?._id}`}
            className="text-lg font-bold capitalize text-pretty"
          >
            {post.creator?.username || "Anonymous"}
          </Link>
          <div className="relative group">
            <p
              className="text-md text-black/60 italic underline cursor-pointer"
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
          className={`${post.prompt.length > 300 ? "text-base" : "text-lg"} text-pale-blue`}
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
        <button
          className="bg-gradient-to-r from-orange-600 to-amber-600 text-white rounded-full py-2 px-6 hover:cursor-pointer text-sm flex items-center justify-center"
          onClick={() => handleCopy(post.prompt)}
        >
          Copy Prompt
        </button>
        {session?.user?.email === post.creator?.email && (
          <div className="flex flex-row gap-4">
            <div className="relative group">
              <DeleteIcon
                onClick={() => handleShowModal(post._id)}
                className="text-xl text-primary-orange cursor-pointer"
              ></DeleteIcon>
              <span className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 opacity-0 group-hover:opacity-100 hidden group-hover:block transition-opacity duration-400 ease-out bg-primary-orange text-white text-xs rounded py-1 px-2">
                Delete
              </span>
            </div>
            <div className="relative group">
              <EditIcon
                className="text-xl text-primary-orange cursor-pointer"
                onClick={() => handleEdit(post._id)}
              />
              <span className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 opacity-0 group-hover:opacity-100 hidden group-hover:block transition-opacity duration-400 ease-out bg-primary-orange text-white text-xs rounded py-1 px-2">
                Edit
              </span>
            </div>
          </div>
        )}
      </div>
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm z-50">
          <div className="bg-white rounded-lg p-8 shadow-lg">
            <h2 className="text-xl font-bold mb-4">Are you sure?</h2>
            <p className="text-gray-700 mb-6">
              Do you really want to delete this post? This action cannot be
              undone.
            </p>
            <div className="flex justify-end gap-4">
              <button
                className="bg-gradient-to-r from-orange-600 to-amber-600 text-white rounded-full py-2 px-6 hover:cursor-pointer text-sm flex items-center justify-center"
                onClick={handleDelete}
              >
                Delete
              </button>
              <button
                className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-full py-2 px-6 hover:cursor-pointer text-sm flex items-center justify-center"
                onClick={() => setShowModal(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PromptCard;
