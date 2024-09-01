"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { FaRegCopy as CopyIcon } from "react-icons/fa6";
import { MdOutlineEdit as EditIcon } from "react-icons/md";
import { useSession } from "next-auth/react";
import { MdDeleteOutline as DeleteIcon } from "react-icons/md";

export default function Feed() {
  const router = useRouter();
  const [posts, setPosts] = useState([]);
  const { data: session } = useSession();

  useEffect(() => {
    const fetchPosts = async () => {
      const res = await fetch("/api/posts");
      const data = await res.json();
      setPosts(data);
    };
    fetchPosts();
  }, []);

  const handleCopy = async (text) => {
    try {
      await navigator.clipboard.writeText(text);
      alert("Copied!");
    } catch (err) {
      console.log(err);
    }
  };

  const handleEdit = (postId) => {
    router.push(`/posts/edit/${postId}`);
  };
  const handleDelete = async (postId) => {
    try {
      const response = await fetch("/api/posts/delete", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          postId,
        }),
      });
      setPosts(posts.filter((post) => post._id !== postId));
      if (response.ok) {
        router.push("/");
      } else {
        throw new Error(data.error || "Something went wrong");
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <section className="flex flex-col py-2 md:py-4 w-full items-start gap-8 min-h-screen">
      <div className="flex flex-col items-center justify-center gap-8 w-full px-4 md:px-8">
        <input
          type="text"
          placeholder="Search for a tag or a username"
          className="w-full px-4 py-2 rounded-lg md:max-w-[55%] shadow-lg shadow-black/10"
        />
      </div>
      <div className="flex flex-row flex-wrap gap-4 justify-between items-start">
        {posts.map((post) => (
          <div
            className="flex flex-col border-2 border-black/10 rounded-lg p-4 gap-4 max-w-[350px] shadow-lg shadow-transparent hover:shadow-primary-orange/20 hover:border-primary-orange/35"
            key={post._id}
          >
            <div className="flex justify-start flex-row gap-4">
              <Image
                src={post.creator?.image}
                alt={post.creator?.username || "Unknown User"}
                width={60}
                height={60}
                className="rounded-full"
              />
              <div className="flex flex-col flex-wrap">
                <p className="text-lg font-bold capitalize">
                  {post.creator?.username || "Anonymous"}
                </p>
                <p className="text-md text-black/60 italic underline">
                  {post.creator?.email || "Anonymous@anon.com"}
                </p>
              </div>
            </div>

            <div className="flex items-center justify-start mt-2">
              <p className="text-lg text-pale-blue">{post.prompt}</p>
            </div>
            <div className="flex gap-x-2 gap-y-1 flex-wrap max-w-[70%]">
              {post.tags[0].split(" ").map((tag, index) => (
                <span
                  className="text-sm text-blue-500 font-semibold"
                  key={index}
                >
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
                  <DeleteIcon
                    onClick={() => handleDelete(post._id)}
                    className="text-xl text-primary-orange cursor-pointer"
                  >
                    Delete Post
                  </DeleteIcon>
                  <EditIcon
                    className="text-xl text-primary-orange cursor-pointer"
                    onClick={() => handleEdit(post._id)}
                  />
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
