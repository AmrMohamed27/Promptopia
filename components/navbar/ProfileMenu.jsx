"use client";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { IoMdArrowDropright as ArrowRight } from "react-icons/io";
import { IoMdArrowDropleft as ArrowLeft } from "react-icons/io";
import Button from "../common/Button";
import DarkModeIcon from "./DarkModeIcon";
import { signOut, useSession } from "next-auth/react";
import useDarkMode from "@hooks/useDarkMode";

const ProfileMenu = ({ mobile }) => {
  // Profile Dropdown
  const [profileIsOpen, setProfileIsOpen] = useState(false);
  const toggleProfile = () => {
    setProfileIsOpen((prev) => !prev);
  };

  // Mobile menu
  const [mobileMenu, setMobileMenu] = useState(false);
  const toggleMobileMenu = () => {
    setMobileMenu((prev) => !prev);
  };

  // Dark Mode
  const [_, toggleDarkMode] = useDarkMode();

  // Session
  const { data: session, status } = useSession();

  return !mobile ? (
    <>
      <div
        className={`flex flex-row flex-nowrap rounded-full ${
          profileIsOpen
            ? "w-[11rem] px-4 justify-start"
            : "w-[5rem] justify-start px-2"
        } py-1 items-center  border-2 border-black/30 dark:border-white/30 transition-all duration-500 ease-out`}
      >
        <Image
          src={session?.user.image}
          alt="Profile"
          width={30}
          height={30}
          className="rounded-full"
        />
        {profileIsOpen ? (
          <>
            <Link
              href={`/profile/${session?.user.id}`}
              className={`text-lg ml-4 hover:text-pale-blue dark:hover:text-primary-orange hover:underline`}
            >
              {session?.user.name.split(" ")[0]}
            </Link>
            <div className="flex items-center justify-end w-full">
              <ArrowLeft
                className="text-2xl cursor-pointer"
                onClick={toggleProfile}
              />
            </div>
          </>
        ) : (
          <ArrowRight
            className="text-2xl ml-1 cursor-pointer"
            onClick={toggleProfile}
          />
        )}
      </div>
    </>
  ) : (
    <>
      {/* Mobile Nav */}
      {status === "authenticated" ? (
        <div className="flex md:hidden items-center justify-center relative">
          <Image
            src={session?.user.image}
            alt="Profile"
            width={30}
            height={30}
            className="rounded-full cursor-pointer"
            onClick={toggleMobileMenu}
          />
          <ul
            className={`absolute top-12 -left-32 w-[10rem] bg-white dark:bg-black border-2 border-transparent dark:border-white/50 shadow-lg p-4 z-50 ${mobileMenu ? "flex" : "hidden"} flex-col items-end gap-8 font-semibold text-sm`}
          >
            <li className="flex flex-col gap-4 items-center justify-center w-full">
              <Link href="/profile">My Profile</Link>
              <Link href="/posts/create">Create a Prompt</Link>
            </li>
            <li className="w-full">
              <Button onClick={signOut} className={"w-full"} color={"black"}>
                Sign Out
              </Button>
            </li>
            <li className="w-full">
              <Button
                onClick={toggleDarkMode}
                className={"w-full"}
                color={`black`}
              >
                <DarkModeIcon className={"text-2xl"} />
              </Button>
            </li>
          </ul>
        </div>
      ) : (
        <></>
      )}
    </>
  );
};

export default ProfileMenu;
