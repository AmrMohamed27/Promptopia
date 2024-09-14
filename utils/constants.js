import { IoMdTime } from "react-icons/io";
import { IoBookOutline } from "react-icons/io5";
import { BiUpvote } from "react-icons/bi";
import { FaRegCommentAlt } from "react-icons/fa";
import { TbArrowsSort } from "react-icons/tb";

export const sortOptions = [
  { label: "Default", icon: <TbArrowsSort /> },
  { label: "Most Recent", icon: <IoMdTime /> },
  { label: "Oldest", icon: <IoBookOutline /> },
  { label: "Most Liked", icon: <BiUpvote /> },
  { label: "Most Commented", icon: <FaRegCommentAlt /> },
];
