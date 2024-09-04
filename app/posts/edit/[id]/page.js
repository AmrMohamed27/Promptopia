"use client";

import { useEffect, useState } from "react";
import CreateForm from "@components/CreateForm";
import Image from "next/image";
import { useSession } from "next-auth/react";
import LoadingCircle from "@components/LoadingCircle";

const Page = ({ params }) => {
  const { data: session } = useSession();
  const id = params.id;
  const [post, setPost] = useState(null);

  useEffect(() => {
    const fetchPost = async () => {
      const res = await fetch(`/api/posts/${id}`, {
        method: "GET",
      });
      const data = await res.json();
      setPost(data);
    };

    if (id) {
      fetchPost();
    }
  }, [id]);
  return (
    <section className="flex py-8 md:py-16 px-4 md:px-8 w-full items-start min-h-screen">
      {session?.user === undefined ? (
        <h1 className="text-3xl md:text-4xl font-bold text-blue-600">
          Please Sign in to edit a prompt
        </h1>
      ) : (
        <div className="w-full flex flex-col gap-16">
          {/* Heading */}
          <div className="flex flex-col items-start justify-center gap-8">
            <h1 className="text-5xl md:text-6xl blue_gradient font-extrabold">
              Edit Post
            </h1>
            <p className="text-lg md:text-xl text-pale-blue md:max-w-[62%]">
              Create and share amazing prompts with the world, and let your
              imagination run wild.
            </p>
          </div>
          {/* Form */}
          {post ? (
            <CreateForm
              initialPrompt={post.prompt}
              initialTagsString={post.tags.join(", ")}
              isEdit
              postId={id}
            />
          ) : (
            <LoadingCircle />
          )}
        </div>
      )}
    </section>
  );
};

export default Page;
