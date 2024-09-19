import Feed from "@components/posts/Feed";
import Hero from "@components/home/Hero";
import { fetchPosts } from "@utils/api/fetch";

const Home = async () => {
  const posts = await fetchPosts();
  return (
    <>
      <Hero />
      <section className="flex flex-col py-2 md:py-4 w-full min-h-screen mb-16 gap-16">
        <Feed posts={posts} />
      </section>
    </>
  );
};

export default Home;
