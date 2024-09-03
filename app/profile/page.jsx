"use client";

import Image from "next/image";
import { useSession } from "next-auth/react";
import Feed from "@components/Feed";

const Page = () => {
  const { data: session } = useSession();
  return (
    <section className="w-full min-h-screen mb-12">
      {session?.user === undefined ? (
        <div className="flex flex-col gap-8 w-full py-8 md:py-16 px-4 md:px-8">
          <h1 className="text-3xl md:text-4xl font-bold text-blue-600">
            Please Sign in to access your profile
          </h1>
        </div>
      ) : (
        <>
          <div className="flex flex-col gap-8 w-full py-8 md:py-16 px-4 md:px-8 ">
            <div className="flex flex-row gap-8 items-center">
              <Image
                src={session?.user?.image}
                alt={session?.user?.name}
                width={100}
                height={100}
                className="rounded-full"
              />
              <div className="flex flex-col gap-2">
                <h1 className="text-3xl md:text-4xl font-bold text-blue-600">
                  {session?.user?.name}&apos;s Profile
                </h1>
                <p className="text-lg md:text-xl text-pale-blue">
                  Email: {session?.user?.email}
                </p>
              </div>
            </div>
          </div>
          <div className="flex py-2 md:py-4 flex-col gap-8 -mt-12">
            <h2 className="text-2xl md:text-3xl text-pale-blue font-bold text-center">
              Your Prompts:
            </h2>
            <Feed showSearch={true} userEmail={session?.user?.email} />
          </div>
        </>
      )}
    </section>
  );
};

export default Page;
