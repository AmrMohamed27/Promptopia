import Feed from "@components/Feed";
import Hero from "@components/Hero";

const Home = () => {
  return (
    <>
      <Hero />
      <section className="flex flex-col py-2 md:py-4 w-full min-h-screen mb-16 gap-16">
        <Feed showSearch={true} />
      </section>
    </>
  );
};

export default Home;
