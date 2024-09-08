"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { useFetchPosts } from "./PostsContext";

const CreateForm = ({ initialPrompt, initialTagsString, postId, isEdit }) => {
  const router = useRouter();
  const { data: session } = useSession();

  const [prompt, setPrompt] = useState(initialPrompt || "");
  const [tagsString, setTagsString] = useState(initialTagsString || "");
  const { setPosts, fetchPosts } = useFetchPosts();
  const successRef = useRef();

  const handlePromptChange = (e) => {
    setPrompt(e.target.value);
  };

  const handleTagsChange = (e) => {
    setTagsString(e.target.value);
  };

  const handleClear = (e) => {
    e.preventDefault();
    setPrompt("");
    setTagsString("");
  };

  const handleCancel = (e) => {
    e.preventDefault();
    router.push("/");
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    const tags = tagsString.split(", ");
    try {
      const body = JSON.stringify({
        prompt: prompt,
        tags: tags,
        userId: session?.user.id,
      });
      let response;
      if (!isEdit) {
        response = await fetch("/api/posts/create", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: body,
        });
      } else {
        response = await fetch(`/api/posts/edit/${postId}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: body,
        });
      }
      if (response.ok) {
        await fetchPosts();
        router.push("/");
      } else {
        throw new Error(data.error || "Something went wrong");
      }
    } catch (error) {
      successRef.current.textContent =
        "Error creating or editing post: " + error.message;
      successRef.current.style.color = "#FF0000";
    }
  };

  return (
    <div className="rounded-xl border-2 border-black/10 dark:border-white/30 px-8 py-8">
      <form className="flex flex-col gap-8">
        <div className="flex flex-col items-start gap-2">
          <label
            htmlFor="form-textarea"
            className="font-semibold text-lg text-label-black dark:text-white"
          >
            Your Prompt
          </label>
          <textarea
            placeholder="Write your prompt here..."
            id="form-textarea"
            className="bg-white w-full h-[200px] resize-none px-4 py-2 rounded-lg outline-0 border-2 border-black/10 dark:border-white/30 text-black"
            onChange={handlePromptChange}
            value={prompt}
          ></textarea>
        </div>
        <div className="flex flex-col items-start gap-2">
          <label
            htmlFor="form-tag"
            className="font-semibold text-lg text-label-black dark:text-white"
          >
            Tags
          </label>
          <input
            type="text"
            placeholder="#tag, #webdevelopment, #web3"
            id="form-tag"
            className="bg-white w-full px-4 py-2 rounded-lg outline-0 border-2 border-black/10 dark:border-white/30 text-black"
            onChange={handleTagsChange}
            value={tagsString}
          />
        </div>
        <div className="flex flex-row gap-4 justify-start items-center">
          <button
            className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-full py-2 px-6 hover:cursor-pointer text-sm flex items-center justify-center"
            onClick={handleCreate}
          >
            {isEdit ? "Save" : "Create"}
          </button>
          <button
            className="bg-gradient-to-r from-orange-600 to-amber-600 text-white rounded-full py-2 px-6 hover:cursor-pointer text-sm flex items-center justify-center"
            onClick={handleClear}
          >
            Clear
          </button>
          <button
            className="bg-gradient-to-r from-orange-600 to-amber-600 text-white rounded-full py-2 px-6 hover:cursor-pointer text-sm flex items-center justify-center"
            onClick={handleCancel}
          >
            Cancel
          </button>
        </div>
        <div>
          <p ref={successRef} className="text-sm font-semibold "></p>
        </div>
      </form>
    </div>
  );
};

export default CreateForm;
