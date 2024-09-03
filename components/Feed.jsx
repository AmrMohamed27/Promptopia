"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { MdOutlineEdit as EditIcon } from "react-icons/md";
import { useSession } from "next-auth/react";
import { MdDeleteOutline as DeleteIcon } from "react-icons/md";

export default function Feed() {
  const router = useRouter();
  const [posts, setPosts] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [postToDelete, setPostToDelete] = useState(null);
  const [feedPage, setFeedPage] = useState(0);
  const [searchValue, setSearchValue] = useState("");
  const { data: session } = useSession();

  const fetchPosts = async () => {
    const res = await fetch("/api/posts");
    const data = await res.json();
    setPosts(data);
  };
  useEffect(() => {
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
      setPosts(posts.filter((post) => post._id !== postToDelete));
      setShowModal(false);
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

  const handleSearchValueChange = (e) => {
    setSearchValue(e.target.value);
  };

  const handleSearch = (text) => {
    if (text.charAt(0) === "#") {
      setPosts(posts.filter((post) => post.tags.includes(text)));
    } else if (text.charAt(0) === "@") {
      setPosts(posts.filter((post) => post.creator?.username === text));
    } else if (text === "") {
      fetchPosts();
    } else {
      setPosts(posts.filter((post) => post.prompt.includes(text)));
    }
  };
  return (
    <section className="flex flex-col py-2 md:py-4 w-full min-h-screen mb-16 gap-16">
      <div className="gap-24 flex flex-col items-start w-full">
        <div className="flex flex-col md:flex-row items-center justify-center gap-8 w-full px-4 md:px-8">
          <input
            type="text"
            placeholder="Search for a #tag, @username or prompt"
            className="w-full px-4 py-2 rounded-lg lg:max-w-[75%] shadow-lg shadow-black/10 outline-none"
            value={searchValue}
            onChange={handleSearchValueChange}
          />
          <button
            className="bg-gradient-to-r from-orange-600 to-amber-600 text-white rounded-lg py-2 px-6 hover:cursor-pointer text-sm flex items-center justify-center"
            onClick={() => handleSearch(searchValue)}
          >
            Search
          </button>
        </div>
        <div className="flex flex-row flex-wrap justify-center lg:justify-between gap-8 items-center lg:items-start w-full lg:w-auto">
          {posts.slice(feedPage * 6, feedPage * 6 + 6).map((post) => (
            <div
              className="flex flex-col border-2 border-black/10 rounded-lg p-4 gap-4 w-full lg:w-[400px] xl:w-[350px] shadow-lg shadow-transparent hover:shadow-primary-orange/20 hover:border-primary-orange/35"
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
                  <div className="relative group">
                    <p
                      className="text-md text-black/60 italic underline cursor-pointer"
                      onClick={() => handleCopy(post.creator?.email)}
                    >
                      {post.creator?.email || "Anonymous@anon.com"}
                    </p>
                    <span className="absolute top-full left-1/2 transform -translate-x-1/2 mb-2 opacity-0 group-hover:opacity-100 hidden group-hover:block transition-opacity duration-400 ease-out bg-primary-orange text-white text-xs rounded py-1 px-2">
                      Click to copy Email
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-start mt-2">
                <p className="text-lg text-pale-blue">{post.prompt}</p>
              </div>
              <div className="flex gap-x-2 gap-y-1 flex-wrap max-w-[70%]">
                {post.tags.map((tag, index) => (
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
            </div>
          ))}
        </div>
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
      <div className="flex flex-row justify-center items-center gap-4">
        {Array.from({ length: Math.ceil(posts.length / 6) }).map((_, index) => {
          return index < 5 ? (
            <div
              key={index}
              className={`flex items-center justify-center px-4 py-2 cursor-pointer rounded-lg ${index === feedPage ? "bg-primary-orange text-white" : "bg-blue-600 text-white"}`}
              onClick={() => setFeedPage(index)}
            >
              <span>{index + 1}</span>
            </div>
          ) : index === Math.ceil(posts.length / 6) - 1 ? (
            <div className="flex flex-row gap-4 items-end">
              <span>....</span>
              <div
                key={index}
                className={`flex items-center justify-center px-4 py-2 cursor-pointer rounded-lg ${index === feedPage ? "bg-primary-orange text-white" : "bg-blue-600 text-white"}`}
                onClick={() => setFeedPage(index)}
              >
                <span>{index + 1}</span>
              </div>
            </div>
          ) : (
            <></>
          );
        })}
      </div>
    </section>
  );
}
