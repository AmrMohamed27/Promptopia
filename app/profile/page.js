"use client";

import { useSession } from "next-auth/react";
import Page from "./[id]/page";
import LoadingCircle from "@components/common/LoadingCircle";

const Profile = () => {
  const { data: session, status } = useSession();
  if (status === "loading") {
    return <LoadingCircle />;
  }
  return (
    <section className="w-full min-h-screen mb-12">
      {session?.user === undefined ? (
        <div className="flex flex-col gap-8 w-full py-8 md:py-16 px-4 md:px-8">
          <h1 className="text-3xl md:text-4xl font-bold text-blue-600">
            Please Sign in to access your profile
          </h1>
        </div>
      ) : (
        <Page params={{ id: session.user.id }} myProfile={true} />
      )}
    </section>
  );
};

export default Profile;
