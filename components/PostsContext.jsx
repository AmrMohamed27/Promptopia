"use client";
import { createContext, useContext, useState, useEffect } from "react";

// Create the Dark Mode Context
const PostsContext = createContext();

// Create a provider component
export function PostsProvider({ children }) {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchPosts = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/posts");
      if (!res.ok) {
        throw new Error("Network response was not ok");
      }
      const originalData = await res.json();
      const data = originalData.reverse();
      setPosts(data);
    } catch (error) {
      console.error("Error fetching posts:", error);
    } finally {
      setLoading(false); // Set loading to false when fetch is complete
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <PostsContext.Provider
      value={{
        posts,
        setPosts,
        loading,
        setLoading,
        fetchPosts,
      }}
    >
      {children}
    </PostsContext.Provider>
  );
}

// Custom hook to use the Dark Mode context
export const useFetchPosts = () => useContext(PostsContext);
