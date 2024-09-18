import { useState } from "react";
import {
  FaArrowDown as ArrowDown,
  FaArrowUp as ArrowUp,
} from "react-icons/fa6";
import { IoMdTime } from "react-icons/io";
import { IoBookOutline } from "react-icons/io5";
import { BiUpvote } from "react-icons/bi";
import { FaRegCommentAlt } from "react-icons/fa";
import { TbArrowsSort } from "react-icons/tb";

const Dropdown = ({
  options,
  sortBy: selectedOption,
  setSortBy: setSelectedOption,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleOptionClick = (option) => {
    setSelectedOption(option);
    setIsOpen(false);
  };
  return (
    <div className="relative inline-block w-64 z-10">
      {/* Selected Option / Trigger */}
      <div
        className="flex items-center justify-between bg-white dark:bg-black border border-black/30 dark:border-white/30 rounded-lg px-4 py-2 cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className={`text-black dark:text-white`}>
          {selectedOption ? selectedOption.label : "Select an option"}
        </span>
        {isOpen ? (
          <ArrowUp className="text-black dark:text-white" />
        ) : (
          <ArrowDown className="text-black dark:text-white" />
        )}
      </div>

        
      {/* Dropdown Menu */}
      {isOpen && (
        <ul className="absolute mt-2 w-full bg-white dark:bg-black border border-black/30 dark:border-white/30 rounded-lg shadow-lg">
          {options.map((option, index) => (
            <li
              key={index}
              onClick={() => handleOptionClick(option)}
              className="flex items-center px-4 py-2 cursor-pointer hover:bg-black/30 dark:hover:bg-white/30"
            >
              {/* Placeholder for Icon */}
              <div className="mr-2">
                {option.icon /* Replace this with your icon component */}
              </div>
              <span className="text-black dark:text-white">{option.label}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
export default Dropdown;
