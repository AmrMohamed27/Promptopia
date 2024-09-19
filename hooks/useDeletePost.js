import { useState } from "react";
import { deletePost } from "@utils/api/fetch";

export const useDeletePost = (filteredPosts, setFilteredPosts) => {
  const [showModal, setShowModal] = useState(false);
  const [postToDelete, setPostToDelete] = useState(null);

  const handleShowModal = (postId) => {
    setPostToDelete(postId);
    setShowModal(true);
  };

  const handleDelete = async () => {
    try {
      await deletePost(postToDelete);
      setFilteredPosts((prev) =>
        prev.filter((post) => post._id != postToDelete)
      );
      setShowModal(false);
    } catch (error) {
      console.error("Failed to delete post:", error);
    }
  };

  return {
    filteredPosts,
    handleShowModal,
    showModal,
    setShowModal,
    handleDelete,
  };
};
