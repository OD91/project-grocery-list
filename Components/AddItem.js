import { FaPlus } from "react-icons/fa";
import { useRef } from "react";

const AddItem = ({ newItem, setNewItem, handleSubmit }) => {
  const inputRef = useRef();
  return (
    <form
      className="bg-white border-b-2 px-8 pt-6 pb-8 mb-4 flex items-center"
      onSubmit={handleSubmit}
    >
      <label
        className="hidden text-gray-700 text-sm font-bold mb-2"
        for="addItem"
      >
        Add Item
      </label>
      <input
        autoFocus
        ref={inputRef}
        is="addItem"
        type="text"
        placeholder="Add Item"
        required
        class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent mr-4"
        value={newItem}
        onChange={(e) => setNewItem(e.target.value)}
      />
      <button
        type="submit"
        aria-label="Add Item"
        className="rounded p-2 border-2 shadow hover:bg-green-600 text-black hover:text-white transition duration-400 ease-in-out"
        onClick={() => inputRef.current.focus()}
      >
        <FaPlus />
      </button>
    </form>
  );
};

export default AddItem;
