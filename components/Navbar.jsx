"use client";
import Image from "next/image";
import Link from "next/link";
import { useSession, signIn, signOut, getProviders } from "next-auth/react";
import Button from "./Button";
import { useState, useEffect } from "react";
import { IoMdArrowDropright as ArrowRight } from "react-icons/io";
import { IoMdArrowDropleft as ArrowLeft } from "react-icons/io";
import { useDarkMode } from "./DarkModeContext";
import DarkModeIcon from "./DarkModeIcon";

const Navbar = () => {
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
  const { isDarkMode, toggleDarkMode } = useDarkMode();

  const { data: session, status } = useSession();

  const [providers, setProviders] = useState(null);

  useEffect(() => {
    (async () => {
      const res = await getProviders();
      setProviders(res);
    })();
  }, []);
  return (
    <header className="py-4 px-6 md:px-12 lg:px-[7.5rem] w-full fixed top-0 z-50 bg-white/70 dark:bg-black/70 backdrop-blur-sm border-b-2 border-black/10 dark:border-white/30">
      <div className="flex flex-row items-center justify-between w-full">
        <Link href="/" className="flex flex-row items-center gap-2">
          <Image
            src="/assets/images/logo.svg"
            alt="Logo"
            width={30}
            height={30}
          />
          <p className="text-xl font-bold">Promptopia</p>
        </Link>
        {/* PC Nav */}
        {status === "authenticated" ? (
          <div className="hidden md:flex flex-row gap-4 items-center">
            <Button color={"black"} href="/posts/create">
              Create a Post
            </Button>
            <Button onClick={signOut} color={"white"}>
              Sign Out
            </Button>
            <div
              className={`flex flex-row flex-nowrap rounded-full ${
                profileIsOpen
                  ? "w-[11rem] px-4 justify-start"
                  : "w-[5rem] justify-start px-2"
              } py-1 items-center  border-2 border-black/30 dark:border-white/30 transition-all duration-500 ease-out`}
            >
              <Image
                src={session.user.image}
                alt="Profile"
                width={30}
                height={30}
                className="rounded-full"
              />
              {profileIsOpen ? (
                <>
                  <Link
                    href="/profile"
                    className={`text-lg ml-4 hover:text-pale-blue dark:hover:text-primary-orange hover:underline`}
                  >
                    {session.user.name.split(" ")[0]}
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
            <DarkModeIcon className={"text-4xl"} />
          </div>
        ) : (
          <div className="flex items-center gap-4">
            {providers &&
              Object.values(providers).map((provider) => (
                <Button
                  key={provider.name}
                  color={"black"}
                  onClick={() => {
                    signIn(provider.id);
                  }}
                >
                  Sign In with {provider.name}
                </Button>
              ))}
            <DarkModeIcon className={"text-4xl"} />
          </div>
        )}
        {/* Mobile Nav */}
        {status === "authenticated" ? (
          <div className="flex md:hidden items-center justify-center relative">
            <Image
              src={session.user.image}
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
                  color={`${isDarkMode ? "white" : "black"}`}
                >
                  <DarkModeIcon className={"text-2xl"} />
                </Button>
              </li>
            </ul>
          </div>
        ) : (
          <></>
        )}
      </div>
    </header>
  );
};

export default Navbar;
