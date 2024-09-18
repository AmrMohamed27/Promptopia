import { MdOutlineDarkMode as DarkIcon } from "react-icons/md";
import { CiLight as LightIcon } from "react-icons/ci";
import useDarkMode from "@hooks/useDarkMode";
import { useState, useEffect } from "react";
import LoadingCircle from "@components/common/LoadingCircle";

const DarkModeIcon = ({ className }) => {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);
  const [isDarkMode, toggleDarkMode] = useDarkMode();
  const classes = className + " cursor-pointer";
  if (!mounted) return <LoadingCircle />;
  return isDarkMode ? (
    <DarkIcon className={classes} onClick={toggleDarkMode} />
  ) : (
    <LightIcon className={classes} onClick={toggleDarkMode} />
  );
};

export default DarkModeIcon;
