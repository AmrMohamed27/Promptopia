"use client";

import { useSession, signOut } from "next-auth/react";
import Button from "../common/Button";
import ProfileMenu from "./ProfileMenu";
import DarkModeIcon from "../common/DarkModeIcon";
import ProvidersButtons from "./ProvidersButtons";

const DesktopNav = () => {
  const { data: _, status } = useSession();

  return status === "authenticated" ? (
    <div className="hidden md:flex flex-row gap-4 items-center">
      <Button color={"black"} href="/posts/create">
        Create a Post
      </Button>
      <Button onClick={signOut} color={"white"}>
        Sign Out
      </Button>
      <ProfileMenu mobile={false} />
      <DarkModeIcon className={"text-4xl"} />
    </div>
  ) : (
    <div className="flex items-center gap-4">
      <ProvidersButtons />
      <DarkModeIcon className={"text-4xl"} />
    </div>
  );
};

export default DesktopNav;
