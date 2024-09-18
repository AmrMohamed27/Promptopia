import { IoLogoVercel as Vercel } from "react-icons/io5";
import { FaGithub as GitHub } from "react-icons/fa";
import Link from "next/link";

const Footer = () => {
  return (
    <div className="py-4 px-4 md:px-8 border-t-2 border-pale-blue/20 dark:border-white/30 flex flex-row items-center justify-between w-[calc(100vw-1rem)]">
      <div className="flex flex-col items-start justify-center">
        <p className="text-lg md:text-xl text-pale-blue dark:text-white">
          &copy; Promptopia <span className="">{new Date().getFullYear()}</span>
        </p>
      </div>
      <div className="flex flex-row items-center gap-4">
        <Link
          href="https://vercel.com/amrmohamed27s-projects"
          className="p-3 bg-pale-blue/20 rounded-2xl flex items-center justify-center cursor-pointer dark:bg-pale-blue/50"
        >
          <Vercel className="text-2xl text-pale-blue dark:text-white cursor-pointer" />
        </Link>
        <Link
          href="https://github.com/AmrMohamed27"
          className="p-3 bg-pale-blue/20 rounded-2xl flex items-center justify-center cursor-pointer dark:bg-pale-blue/50"
        >
          <GitHub className="text-2xl text-pale-blue dark:text-white cursor-pointer" />
        </Link>
      </div>
    </div>
  );
};

export default Footer;
