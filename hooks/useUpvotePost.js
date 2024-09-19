"use client";
import { useState } from "react";
import { upvotePost } from "@utils/api/fetch";

export const useUpvotePost = (initialPosts, session) => {
  const [posts, setPosts] = useState(initialPosts);
  const handleUpvote = async (postId, method) => {
    const updatePosts = (post) => {
      if (post._id === postId) {
        return method === "PUT"
          ? { ...post, upvotes: [...post.upvotes, session.user.id] }
          : {
              ...post,
              upvotes: post.upvotes.filter((id) => id != session.user.id),
            };
      }
      return post;
    };

    try {
      setPosts((prev) => prev.map(updatePosts));
      await upvotePost(postId, session.user.id, method);
    } catch (error) {
      // Revert state if request fails
      setPosts(initialPosts);
      throw error;
    }
  };
  return { posts, handleUpvote };
};
