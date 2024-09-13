"use client";

import { useEffect, useState } from "react";
import PromptCard from "./PromptCard";
import LoadingCircle from "./LoadingCircle";
import { useFetchPosts } from "@components/PostsContext";
import Button from "./Button";
export default function Feed({ userEmail }) {
  const [feedPage, setFeedPage] = useState(0);
  const [searchValue, setSearchValue] = useState("");
  const { posts, loading } = useFetchPosts();
  const [filteredPosts, setFilteredPosts] = useState(posts);

  useEffect(() => {
    if (userEmail) {
      setFilteredPosts(
        posts.filter((post) => post.creator?.email === userEmail)
      );
    } else {
      setFilteredPosts(posts);
    }
    return () => {
      setFilteredPosts(posts); // Reset posts on component unmount (e.g., navigating away)
      setFeedPage(0); // Reset page to 0 on unmount
    };
  }, [userEmail, posts, setFilteredPosts]);

  const handleSearchValueChange = (e) => {
    setSearchValue(e.target.value);
  };

  const handleReset = (e) => {
    e.preventDefault();
    setSearchValue("");
    setFilteredPosts(posts);
  };

  const handleSearch = async (text) => {
    if (text.charAt(0) === "#") {
      setFilteredPosts((filteredPosts) =>
        filteredPosts.filter((post) =>
          post.tags.some((tag) =>
            tag.toLowerCase().includes(text.toLowerCase())
          )
        )
      );
    } else if (text.charAt(0) === "@") {
      setFilteredPosts(
        filteredPosts.filter((post) =>
          post.creator?.username
            .toLowerCase()
            .includes(text.slice(1).toLowerCase())
        )
      );
    } else if (text === "") {
      setFilteredPosts(posts);
    } else {
      setFilteredPosts((filteredPosts) =>
        filteredPosts.filter((post) =>
          post.prompt.toLowerCase().includes(text.toLowerCase())
        )
      );
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
            className="w-full px-4 py-2 rounded-lg lg:max-w-[75%] outline-none text-black dark:text-white bg-transparent border-2 border-black/20 dark:border-white/30"
            value={searchValue}
            onChange={handleSearchValueChange}
          />
          <div className="flex flex-row gap-4 items-center">
            <Button
              onClick={() => handleSearch(searchValue)}
              color={"orange"}
              className={"rounded-lg"}
            >
              Search
            </Button>
            <Button
              color={"blue"}
              onClick={handleReset}
              className={"rounded-lg"}
            >
              Reset
            </Button>
          </div>
        </div>
        {/* Loading Indicator */}
        {loading && <LoadingCircle />}
        {/* Prompts List */}
        <div className="flex flex-row flex-wrap justify-between gap-8 items-start w-full ">
          {filteredPosts.slice(feedPage * 6, feedPage * 6 + 6).map((post) => (
            <PromptCard
              key={post._id}
              post={post}
              filteredPosts={filteredPosts}
              setFilteredPosts={setFilteredPosts}
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
