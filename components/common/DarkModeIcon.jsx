import { useDarkMode } from "./DarkModeContext";
import { MdDarkMode as DarkIcon } from "react-icons/md";
import { CiLight as LightIcon } from "react-icons/ci";

const DarkModeIcon = ({ className }) => {
  const { isDarkMode, toggleDarkMode } = useDarkMode();
  const classes = className + " cursor-pointer";
  return isDarkMode ? (
    <LightIcon className={classes} onClick={toggleDarkMode} />
  ) : (
    <DarkIcon className={classes} onClick={toggleDarkMode} />
  );
};

export default DarkModeIcon;
