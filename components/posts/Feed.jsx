"use client";

import { useEffect, useState } from "react";
import PromptCard from "./PromptCard";
import Button from "../common/Button";
import { sortOptions } from "@utils/constants";
import Dropdown from "./Dropdown";

export default function Feed({ posts }) {
  const [feedPage, setFeedPage] = useState(0);
  const [searchValue, setSearchValue] = useState("");
  const [filteredPosts, setFilteredPosts] = useState(posts);
  const [sortBy, setSortBy] = useState(null);

  // Filter posts for a user
  // useEffect(() => {
  //   console.log("Filtering by userEmail:", userEmail);
  //   if (userEmail) {
  //     const userPosts = posts.filter((post) => {
  //       console.log("Post Creator:", post.creator?.email);
  //       return post.creator?.email === userEmail;
  //     });
  //     console.log("Filtered Posts:", userPosts);
  //     setFilteredPosts(userPosts);
  //   } else {
  //     setFilteredPosts(posts);
  //   }
  //   setFeedPage(0);
  // }, [userEmail, posts]);
  // Sort Posts
  useEffect(() => {
    const sortPosts = (posts, defaultPosts, selectedOption) => {
      if (!selectedOption) return defaultPosts;
      switch (selectedOption.label) {
        case "Most Recent":
          return posts.sort(
            (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
          );

        case "Oldest":
          return posts.sort(
            (a, b) => new Date(a.createdAt) - new Date(b.createdAt)
          );

        case "Most Liked":
          return posts.sort((a, b) => b.upvotes.length - a.upvotes.length);

        case "Most Commented":
          return posts.sort((a, b) => b.comments.length - a.comments.length);

        default:
          return defaultPosts;
      }
    };
    setFilteredPosts(sortPosts([...filteredPosts], [...posts], sortBy));
  }, [sortBy, posts]);

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
        {/* {loading && <LoadingCircle />} */}
        {/* Sort By */}
        <div className="flex flex-row gap-4 items-center text-black dark:text-white -mt-8 -mb-8">
          <span>Sort By: </span>
          <Dropdown
            options={sortOptions}
            sortBy={sortBy}
            setSortBy={setSortBy}
          />
        </div>
        {/* Prompts List */}
        <div className="flex flex-row flex-wrap justify-between gap-8 items-start w-full ">
          {filteredPosts?.slice(feedPage * 6, feedPage * 6 + 6).map((post) => (
            <PromptCard
              key={post._id}
              post={post}
              filteredPosts={filteredPosts}
              setFilteredPosts={setFilteredPosts}
              feedPage={feedPage}
              setFeedPage={setFeedPage}
              posts={posts}
            />
          ))}
        </div>
      </div>
      {/* Pages */}
      <div className="flex flex-row justify-center items-center gap-4 mt-8">
        {Array.from({ length: Math.ceil(posts?.length / 6) }).map(
          (_, index) => {
            return index < 5 ? (
              <div
                key={index}
                className={`flex items-center justify-center px-4 py-2 cursor-pointer rounded-lg ${index === feedPage ? "bg-primary-orange text-white" : "bg-blue-600 text-white"}`}
                onClick={() => setFeedPage(index)}
              >
                <span>{index + 1}</span>
              </div>
            ) : index === Math.ceil(posts?.length / 6) - 1 ? (
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
          }
        )}
      </div>
    </>
  );
}
