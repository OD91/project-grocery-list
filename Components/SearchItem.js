const SearchItem = ({ search, setSearch }) => {
  return (
    <form
      onSubmit={(e) => e.preventDefault()}
      className="bg-white border-b-2 px-8 pt-6 pb-8 mb-4 flex items-center"
    >
      <label for="search" className="hidden">
        Search
      </label>
      <input
        id="search"
        type="text"
        role="searchbox"
        placeholder="Search Items"
        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent mr-4"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
    </form>
  );
};

export default SearchItem;
