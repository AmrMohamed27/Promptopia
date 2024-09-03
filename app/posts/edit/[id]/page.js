"use client";

import { useEffect, useState } from "react";
import CreateForm from "@components/CreateForm";
import Image from "next/image";
import { useSession } from "next-auth/react";

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
            <div className="fixed inset-0 flex items-center justify-center bg-white bg-opacity-75 backdrop-blur-sm z-50">
              <Image
                src="/assets/icons/LoadingIcon.svg"
                alt="Loading..."
                width={100}
                height={100}
              />
            </div>
          )}
        </div>
      )}
    </section>
  );
};

export default Page;
