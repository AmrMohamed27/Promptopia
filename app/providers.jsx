"use client";
import AuthProvider from "./context/AuthProvider";
import { ThemeProvider } from "next-themes";

export const Providers = ({ children }) => {
  return (
    <AuthProvider>
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
        {children}
      </ThemeProvider>
    </AuthProvider>
  );
};
