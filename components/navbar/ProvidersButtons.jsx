"use client";

import Button from "../common/Button";
import { signIn } from "next-auth/react";
import { useState, useEffect } from "react";
import { getProviders } from "next-auth/react";

const ProvidersButtons = () => {
  const [providers, setProviders] = useState({});
  useEffect(() => {
    (async () => {
      const res = await getProviders();
      setProviders(res);
    })();
  }, []);
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
