"use client";
import Feed from "@components/posts/Feed";
import Hero from "@components/home/Hero";
import { fetchClientPosts } from "@utils/api/fetch";
import { useSearchParams, useRouter } from "next/navigation";
import { useEffect } from "react";
import { useState } from "react";
import LoadingCircle from "@components/common/LoadingCircle";

const Home = async () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const searchParams = useSearchParams();
  const router = useRouter();
  const refetch = searchParams.get("refetch");
  // Fetch posts initially or when refetch parameter is present
  useEffect(() => {
    const fetchInitialPosts = async () => {
      const fetchedPosts = await fetchClientPosts();
      setPosts(fetchedPosts);
      // Remove the refetch parameter from the URL
      if (refetch) {
        router.replace("/", { shallow: true });
      }
      setLoading(false);
    };

    if (refetch || posts.length === 0) {
      fetchInitialPosts();
    }
  }, [refetch, router]);
  return (
    <>
      <Hero />
      <section className="flex flex-col py-2 md:py-4 w-full min-h-screen mb-16 gap-16">
        {loading ? <LoadingCircle /> : <Feed posts={posts} />}
      </section>
    </>
  );
};

export default Home;
