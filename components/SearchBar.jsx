

const SearchBar = () => {
  const handleSearchValueChange = (e) => {
    setSearchValue(e.target.value);
  };

  const handleSearch = (text) => {
    if (text.charAt(0) === "#") {
      setPosts(posts.filter((post) => post.tags.includes(text)));
    } else if (text.charAt(0) === "@") {
      setPosts(posts.filter((post) => post.creator?.username === text));
    } else if (text === "") {
      fetchPosts();
    } else {
      setPosts(posts.filter((post) => post.prompt.includes(text)));
    }
  };
  return (
    <div className="flex flex-col md:flex-row items-center justify-center gap-8 w-full px-4 md:px-8">
      <input
        type="text"
        placeholder="Search for a #tag, @username or prompt"
        className="w-full px-4 py-2 rounded-lg lg:max-w-[75%] shadow-lg shadow-black/10 outline-none"
        value={searchValue}
        onChange={handleSearchValueChange}
      />
      <button
        className="bg-gradient-to-r from-orange-600 to-amber-600 text-white rounded-lg py-2 px-6 hover:cursor-pointer text-sm flex items-center justify-center"
        onClick={() => handleSearch(searchValue)}
      >
        Search
      </button>
    </div>
  );
};

export default SearchBar;
