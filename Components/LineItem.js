import { FaTrashAlt } from "react-icons/fa";

const LineItem = ({ item, handleCheck, handleDelete }) => {
  return (
    <li className="flex items-center p-2 bg-gray-200 border-b-8 border-white">
      <input
        className="w-6 h-6 mr-4"
        type="checkbox"
        onChange={() => handleCheck(item.id)}
        checked={item.checked}
      />
      <label
        className={`flex-1 mr-4 ${item.checked ? "line-through" : null}`}
        onDoubleClick={() => handleCheck(item.id)}
      >
        {item.item}
      </label>
      <FaTrashAlt
        onClick={() => handleDelete(item.id)}
        role="button"
        tabIndex="0"
        className="text-blue-500 hover:text-red-500 w-5 h-5"
        aria-label={`Delete ${item.item}`}
      />
    </li>
  );
};

export default LineItem;
