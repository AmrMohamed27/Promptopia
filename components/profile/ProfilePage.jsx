"use client";
import Feed from "@components/posts/Feed";
import { useSession } from "next-auth/react";
import Image from "next/image";

const ProfilePage = ({ user, posts }) => {
  const { data: session } = useSession();
  const isMyProfile = session?.user?.id === user._id;

  return (
    <>
      <div className="flex flex-col gap-8 w-full py-8 md:py-16 px-4 md:px-8">
        <div className="flex flex-row gap-8 items-center">
          <Image
            src={user.image}
            alt={user.username}
            width={100}
            height={100}
            className="rounded-full"
          />
          <div className="flex flex-col gap-2">
            <h1 className="text-3xl md:text-4xl font-bold text-blue-600">
              {isMyProfile ? "Your" : `${user.username}'s`} Profile
            </h1>
            <p className="text-lg md:text-xl text-pale-blue">
              Email: {user.email}
            </p>
          </div>
        </div>
      </div>
      <div className="flex py-2 md:py-4 flex-col gap-8 md:-mt-12">
        <h2 className="text-2xl md:text-3xl text-pale-blue dark:text-white font-bold text-center">
          {isMyProfile ? "Your" : `${user.username}'s`} Prompts:
        </h2>
        {user.email && <Feed userEmail={user.email} posts={posts} />}
      </div>
    </>
  );
};

export default ProfilePage;
