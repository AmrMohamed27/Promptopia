import { useTheme } from "next-themes";

export default function useDarkMode() {
  const { setTheme, resolvedTheme } = useTheme();
  const isDarkMode = resolvedTheme === "dark";
  const toggleDarkMode = () => {
    isDarkMode ? setTheme("light") : setTheme("dark");
  };
  return [isDarkMode, toggleDarkMode];
}
