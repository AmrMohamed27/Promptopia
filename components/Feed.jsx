const Feed = () => {
  return (
    <section className="flex py-2 md:py-4 px-4 md:px-8 w-full items-center justify-center">
      <div className="flex flex-col items-center justify-center gap-8 w-full">
        <input
          type="text"
          placeholder="Search for a tag or a username"
          className="w-full px-4 py-2 rounded-lg md:max-w-[55%] shadow-lg shadow-black/10"
        />
      </div>
    </section>
  );
};

export default Feed;
