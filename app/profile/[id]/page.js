"use client";

import Image from "next/image";
import Feed from "@components/posts/Feed";
import { useEffect, useState } from "react";
import LoadingCircle from "@components/common/LoadingCircle";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

const Page = ({ params, myProfile }) => {
  const router = useRouter();
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(true);
  const id = params.id;
  const { data: session } = useSession();
  const isMyProfile = myProfile || session?.user?.id === id;

  useEffect(() => {
    if (isMyProfile) {
      router.push("/profile");
    }
  }, [isMyProfile, router]);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch(`/api/user/${id}`, {
          method: "GET",
        });
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setUser(data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, [id]);
  return (
    <section className="w-full min-h-screen mb-12">
      {loading ? (
        <LoadingCircle />
      ) : user === undefined ? (
        <div className="flex flex-col gap-8 w-full py-8 md:py-16 px-4 md:px-8">
          <h1 className="text-3xl md:text-4xl font-bold text-blue-600">
            User doesn&apos;t exist
          </h1>
        </div>
      ) : (
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
            {user.email && <Feed userEmail={user.email} />}
          </div>
        </>
      )}
    </section>
  );
};

export default Page;
