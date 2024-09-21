"use client";

import Button from "../common/Button";
import { signIn } from "next-auth/react";
import { useState, useEffect } from "react";
import { getProviders } from "next-auth/react";
import { IoMenu as Menu } from "react-icons/io5";
import DarkModeIcon from "./DarkModeIcon";
import useDarkMode from "@hooks/useDarkMode";
import { useRef } from "react";

const ProvidersButtons = () => {
  const [providers, setProviders] = useState({});
  const [mobileMenu, setMobileMenu] = useState(false);
  const [_, toggleDarkMode] = useDarkMode();
  const mobileMenuRef = useRef(null);

  // Close mobile menu when the user clicks outside of it
  useEffect(() => {
    // Function to close the menu when clicking outside of it
    const handleClickOutside = (event) => {
      if (
        mobileMenu &&
        mobileMenuRef.current &&
        !mobileMenuRef.current.contains(event.target)
      ) {
        setMobileMenu(false);
      }
    };

    // Add event listener to document
    document.addEventListener("click", handleClickOutside);

    // Cleanup function to remove event listener
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [mobileMenu]);

  // Get authentication providers
  useEffect(() => {
    (async () => {
      const res = await getProviders();
      setProviders(res);
    })();
  }, []);
  return (
    <>
      {/* Mobile */}
      <div className="flex items-center gap-4 md:hidden relative">
        <Menu
          onClick={() => setMobileMenu((prev) => !prev)}
          className="text-2xl cursor-pointer text-primary-orange"
        />
        {mobileMenu && (
          <ul
            className="absolute top-[2.75rem] left-0 -translate-x-[85%] flex flex-col gap-4 p-4 bg-white dark:bg-black border-2 border-transparent dark:border-white/50 shadow-lg"
            ref={mobileMenuRef}
          >
            {providers &&
              Object.values(providers).map((provider, index) => (
                <Button
                  key={provider.name}
                  color={"black"}
                  onClick={() => {
                    signIn(provider.id);
                  }}
                  className="text-sm flex-nowrap min-w-[185px] flex flex-row gap-2"
                >
                  SignIn with {provider.name}
                </Button>
              ))}
            <Button
              onClick={toggleDarkMode}
              className={"w-full"}
              color={`black`}
            >
              <DarkModeIcon className={"text-2xl"} />
            </Button>
          </ul>
        )}
      </div>
      {/* Desktop */}
      {providers &&
        Object.values(providers).map((provider) => (
          <Button
            key={provider.name}
            color={"black"}
            onClick={() => {
              signIn(provider.id);
            }}
            className="hidden md:flex"
          >
            Sign In with {provider.name}
          </Button>
        ))}
      <DarkModeIcon className={"text-4xl hidden md:flex"} />
    </>
  );
};

export default ProvidersButtons;
