"use client";

import { useFetchPosts } from "@components/common/PostsContext";
import Button from "../common/Button";
import { signIn } from "next-auth/react";

const ProvidersButtons = () => {
  const { providers } = useFetchPosts();
  return (
    <>
     
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
    </>
  );
};

export default ProvidersButtons;
