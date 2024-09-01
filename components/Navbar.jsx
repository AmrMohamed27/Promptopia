"use client";
import Image from "next/image";
import Link from "next/link";
import { useSession, signIn, signOut, getProviders } from "next-auth/react";
import Button from "./Button";
import { useState, useEffect } from "react";
import { IoMdArrowDropright as ArrowRight } from "react-icons/io";
import { IoMdArrowDropleft as ArrowLeft } from "react-icons/io";

const Navbar = () => {
  const [profileIsOpen, setProfileIsOpen] = useState(false);
  const toggleProfile = () => {
    setProfileIsOpen((prev) => !prev);
  };
  const [mobileMenu, setMobileMenu] = useState(false);
  const toggleMobileMenu = () => {
    setMobileMenu((prev) => !prev);
  };
  const { data: session, status } = useSession();

  const [providers, setProviders] = useState(null);

  useEffect(() => {
    (async () => {
      const res = await getProviders();
      setProviders(res);
    })();
  }, []);
  return (
    <header className="py-4 px-0 sm:px-8 w-full">
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
            <Button href="/posts/create">Create a Post</Button>
            <Button onClick={signOut} white>
              Sign Out
            </Button>
            <div
              className={`flex flex-row flex-nowrap rounded-full ${
                profileIsOpen
                  ? "w-[11rem] px-4 justify-start"
                  : "w-[5rem] justify-start px-2"
              } py-1 items-center  border-2 border-black/30 transition-all duration-500 ease-out`}
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
                    className={`text-lg ml-4 hover:text-pale-blue hover:underline`}
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
          </div>
        ) : (
          <div className="flex items-center gap-4">
            {providers &&
              Object.values(providers).map((provider) => (
                <Button
                  key={provider.name}
                  onClick={() => {
                    signIn(provider.id);
                  }}
                >
                  Sign In with {provider.name}
                </Button>
              ))}
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
              className={`absolute top-12 -left-32 w-[10rem] bg-white rounded-lg shadow-lg p-4 z-50 ${mobileMenu ? "flex" : "hidden"} flex-col items-end gap-8 font-semibold text-sm`}
            >
              <li className="flex flex-col gap-4 items-end">
                <Link href="/profile">My Profile</Link>
                <Link href="/create">Create a Prompt</Link>
              </li>
              <li>
                <Button onClick={signOut} className={"w-full"}>
                  Sign Out
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
