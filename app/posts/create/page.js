"use client";
import CreateForm from "@components/CreateForm";
import { useSession } from "next-auth/react";

const Page = () => {
  const { data: session } = useSession();
  return (
    <section className="flex py-8 md:py-16 px-4 md:px-8 w-full items-start min-h-screen">
      <div className="w-full flex flex-col gap-16">
        {session?.user === undefined ? (
          <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text">
            Please Sign in to create a prompt
          </h1>
        ) : (
          <>
            {/* Heading */}
            <div className="flex flex-col items-start justify-center gap-8">
              <h1 className="text-5xl md:text-6xl blue_gradient font-extrabold">
                Create a Post
              </h1>
              <p className="text-lg md:text-xl text-pale-blue dark:text-white/50 md:max-w-[62%]">
                Create and share amazing prompts with the world, and let your
                imagination run wild.
              </p>
            </div>
            {/* Form */}
            <CreateForm />
          </>
        )}
      </div>
    </section>
  );
};

export default Page;
