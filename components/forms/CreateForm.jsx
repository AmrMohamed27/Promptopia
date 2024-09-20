"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useSubmitPost } from "@hooks/useSubmitPost";
import PromptInput from "./PromptInput";
import TagsInput from "./TagsInput";
import FormButtons from "./FormButtons";
import { useSession } from "next-auth/react";

const CreateForm = ({
  initialPrompt = "",
  initialTagsString = "",
  postId,
  isEdit,
}) => {
  const router = useRouter();

  const [prompt, setPrompt] = useState(initialPrompt);
  const [tagsString, setTagsString] = useState(initialTagsString);
  const { data: session } = useSession();

  const { handleSubmit } = useSubmitPost({ isEdit, postId });
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
    handleSubmit(prompt, tagsString);
  };

  return session?.user === undefined ? (
    <>
      <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text">
        Please Sign in to create a prompt
      </h1>
    </>
  ) : (
    <>
      {/* Heading */}
      <div className="flex flex-col items-start justify-center gap-8">
        <h1 className="text-5xl md:text-6xl blue_gradient font-extrabold">
          {isEdit ? "Edit" : "Create"} a Post
        </h1>
        <p className="text-lg md:text-xl text-pale-blue dark:text-white/50 md:max-w-[62%]">
          Create and share amazing prompts with the world, and let your
          imagination run wild.
        </p>
      </div>
      <div className="rounded-xl border-2 border-black/10 dark:border-white/30 px-8 py-8">
        <form className="flex flex-col gap-8">
          <PromptInput value={prompt} onChange={handlePromptChange} />
          <TagsInput value={tagsString} onChange={handleTagsChange} />
          <FormButtons
            onSubmit={handleCreate}
            onClear={handleClear}
            onCancel={handleCancel}
            isEdit={isEdit}
          />
        </form>
      </div>
    </>
  );
};

export default CreateForm;
