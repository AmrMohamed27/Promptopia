"use client";
import { createContext, useContext, useState, useEffect } from "react";

// Create the Dark Mode Context
const DarkModeContext = createContext();

// Create a provider component
export function DarkModeProvider({ children }) {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const bodyElement = document.body;
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") {
      setIsDarkMode(true);
      bodyElement.classList.add("dark");
    }
  }, []);

  useEffect(() => {
    const bodyElement = document.body;
    if (isDarkMode) {
      bodyElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    } else {
      bodyElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    }
  }, [isDarkMode]);

  // Toggle dark mode function
  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <DarkModeContext.Provider value={{ isDarkMode, toggleDarkMode }}>
      {children}
    </DarkModeContext.Provider>
  );
}

// Custom hook to use the Dark Mode context
export const useDarkMode = () => useContext(DarkModeContext);
