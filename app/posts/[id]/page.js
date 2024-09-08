"use client";
import LoadingCircle from "@components/LoadingCircle";
import { useState, useEffect } from "react";
import PromptCard from "@components/PromptCard";

const Page = ({ params }) => {
  const postId = params.id;
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [postError, setPostError] = useState(null);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await fetch(`/api/posts/${postId}`);
        if (!res.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await res.json();
        setPost(data);
      } catch (error) {
        console.error("Error fetching post:", error);
        setPostError(error);
      } finally {
        setLoading(false); // Set loading to false when fetch is complete
      }
    };
    fetchPost();
  }, [postId, post]);
  return loading ? (
    <LoadingCircle />
  ) : postError ? (
    <div className="min-h-screen px-8 py-4 flex text-3xl font-bold">
      Error: {postError.message}
    </div>
  ) : (
    <div className="min-h-screen">
      <PromptCard post={post} />
    </div>
  );
};

export default Page;
