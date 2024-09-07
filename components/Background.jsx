"use client";
import { useDarkMode } from "@components/DarkModeContext";

const Background = () => {
  const { isDarkMode } = useDarkMode();

  return isDarkMode ? (
    <></>
  ) : (
    <div className={`main`}>
      <div className={`gradient`}></div>
    </div>
  );
};

export default Background;
