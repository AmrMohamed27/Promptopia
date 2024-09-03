"use client";

import { useEffect, useCallback, useState } from "react";
import Image from "next/image";
import PromptCard from "./PromptCard";

export default function Feed({ showSearch, userEmail }) {
  const [posts, setPosts] = useState([]);

  const [feedPage, setFeedPage] = useState(0);
  const [searchValue, setSearchValue] = useState("");
  const [loading, setLoading] = useState(true);

  const fetchPosts = useCallback(async () => {
    try {
      const res = await fetch("/api/posts");
      if (!res.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await res.json();
      if (userEmail === undefined) {
        setPosts(data);
      } else {
        setPosts(data.filter((post) => post.creator?.email === userEmail));
      }
    } catch (error) {
      console.error("Error fetching posts:", error);
    } finally {
      setLoading(false); // Set loading to false when fetch is complete
    }
  }, [userEmail]);
  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  const handleSearchValueChange = (e) => {
    setSearchValue(e.target.value);
  };

  const handleSearch = (text) => {
    if (text.charAt(0) === "#") {
      setPosts(
        posts.filter((post) =>
          post.tags.some((tag) => tag.toLowerCase() === text.toLowerCase())
        )
      );
    } else if (text.charAt(0) === "@") {
      setPosts(
        posts.filter(
          (post) =>
            post.creator?.email.toLowerCase() === text.slice(1).toLowerCase()
        )
      );
    } else if (text === "") {
      fetchPosts();
    } else {
      setPosts(posts.filter((post) => post.prompt.includes(text)));
    }
    setFeedPage(0);
  };
  return (
    <>
      <div className="gap-24 flex flex-col items-start w-full mt-4">
        {/* Search Bar */}
        {showSearch && (
          <div className="flex flex-col md:flex-row items-center justify-center gap-8 w-full px-4 md:px-8">
            <input
              type="text"
              placeholder="Search for a #tag, @email or prompt"
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
        )}
        {/* Loading Indicator */}
        {loading && (
          <div className="fixed inset-0 flex items-center justify-center bg-white bg-opacity-75 backdrop-blur-sm z-50">
            <Image
              src="/assets/icons/LoadingIcon.svg"
              alt="Loading..."
              width={100}
              height={100}
            />
          </div>
        )}
        {/* Prompts List */}
        <div className="flex flex-row flex-wrap justify-center lg:justify-between gap-8 items-center lg:items-start w-full lg:w-auto">
          {posts.slice(feedPage * 6, feedPage * 6 + 6).map((post) => (
            <PromptCard
              key={post._id}
              post={post}
              posts={posts}
              setPosts={setPosts}
              feedPage={feedPage}
              setFeedPage={setFeedPage}
            />
          ))}
        </div>
      </div>
      {/* Pages */}
      <div className="flex flex-row justify-center items-center gap-4 mt-8">
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
    </>
  );
}
