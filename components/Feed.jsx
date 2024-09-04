"use client";

import { useEffect, useState } from "react";
import PromptCard from "./PromptCard";
import LoadingCircle from "./LoadingCircle";

export default function Feed({ userEmail }) {
  const [posts, setPosts] = useState([]);
  const [fetchedPosts, setFetchedPosts] = useState([]);
  const [feedPage, setFeedPage] = useState(0);
  const [searchValue, setSearchValue] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await fetch("/api/posts");
        if (!res.ok) {
          throw new Error("Network response was not ok");
        }
        const originalData = await res.json();
        const data = originalData.reverse();
        if (!userEmail) {
          setPosts(data);
          setFetchedPosts(data);
        } else {
          setPosts(data.filter((post) => post.creator?.email === userEmail));
          setFetchedPosts(
            data.filter((post) => post.creator?.email === userEmail)
          );
        }
      } catch (error) {
        console.error("Error fetching posts:", error);
      } finally {
        setLoading(false); // Set loading to false when fetch is complete
      }
    };
    fetchPosts();
  }, [userEmail]);

  const handleSearchValueChange = (e) => {
    setSearchValue(e.target.value);
  };

  const handleReset = (e) => {
    e.preventDefault();
    setSearchValue("");
    setPosts(fetchedPosts);
  };

  const handleSearch = async (text) => {
    if (text.charAt(0) === "#") {
      setPosts(
        fetchedPosts.filter((post) =>
          post.tags.some((tag) =>
            tag.toLowerCase().includes(text.toLowerCase())
          )
        )
      );
    } else if (text.charAt(0) === "@") {
      setPosts(
        fetchedPosts.filter((post) =>
          post.creator?.username
            .toLowerCase()
            .includes(text.slice(1).toLowerCase())
        )
      );
    } else if (text === "") {
      setPosts(fetchedPosts);
    } else {
      setPosts(fetchedPosts.filter((post) => post.prompt.includes(text)));
    }
    setFeedPage(0);
  };
  return (
    <>
      <div className="gap-24 flex flex-col items-start w-full mt-4">
        {/* Search Bar */}

        <div className="flex flex-col md:flex-row items-center justify-center gap-8 w-full px-4 md:px-8">
          <input
            type="text"
            placeholder="Search for a #tag, @username or prompt"
            className="w-full px-4 py-2 rounded-lg lg:max-w-[75%] shadow-lg shadow-black/10 outline-none"
            value={searchValue}
            onChange={handleSearchValueChange}
          />
          <div className="flex flex-row gap-4 items-center">
            <button
              className="bg-gradient-to-r from-orange-600 to-amber-600 text-white rounded-lg py-2 px-6 hover:cursor-pointer text-sm flex items-center justify-center"
              onClick={() => handleSearch(searchValue)}
            >
              Search
            </button>
            <button
              className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-lg py-2 px-6 hover:cursor-pointer text-sm flex items-center justify-center"
              onClick={handleReset}
            >
              Reset
            </button>
          </div>
        </div>
        {/* Loading Indicator */}
        {loading && <LoadingCircle />}
        {/* Prompts List */}
        <div className="flex flex-row flex-wrap justify-between gap-8 items-start w-full ">
          {posts.slice(feedPage * 6, feedPage * 6 + 6).map((post, index) => (
            <PromptCard
              key={post._id}
              post={post}
              posts={posts}
              setPosts={setPosts}
              feedPage={feedPage}
              setFeedPage={setFeedPage}
              index={index}
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
