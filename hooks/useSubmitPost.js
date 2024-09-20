"use client";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { createPost, editPost } from "@utils/api/fetch";

export const useSubmitPost = ({ postId, isEdit }) => {
  const router = useRouter();
  const { data: session } = useSession();
  const handleSubmit = async (prompt, tagsString) => {
    const response = isEdit
      ? await editPost(prompt, tagsString, postId)
      : await createPost(prompt, tagsString, session.user.id);
    console.log(response);
    router.push("/?refetch=true");
  };

  return { handleSubmit };
};
