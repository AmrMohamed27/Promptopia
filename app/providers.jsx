"use client";
import { PostsProvider } from "@components/common/PostsContext";
import AuthProvider from "./context/AuthProvider";
import { ThemeProvider } from "next-themes";

export const Providers = ({ children }) => {
  return (
    <PostsProvider>
      <AuthProvider>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          {children}
        </ThemeProvider>
      </AuthProvider>
    </PostsProvider>
  );
};
