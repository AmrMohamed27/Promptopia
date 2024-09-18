import Image from "next/image";
import Link from "next/link";
import ProfileMenu from "./ProfileMenu";
import DesktopNav from "./DesktopNav";

const Navbar = () => {
  return (
    <header className="py-4 px-6 md:px-12 lg:px-[7.5rem] w-full fixed top-0 z-50 bg-white/70 dark:bg-black/70 backdrop-blur-sm border-b-2 border-black/10 dark:border-white/30">
      <div className="flex flex-row items-center justify-between w-full">
        <Link href="/" className="flex flex-row items-center gap-2">
          <Image
            src="/assets/images/logo.svg"
            alt="Logo"
            width={30}
            height={30}
          />
          <p className="text-xl font-bold">Promptopia</p>
        </Link>
        {/* PC Nav */}
        <DesktopNav />
        {/* Mobile Nav */}
        <ProfileMenu mobile={true} />
      </div>
    </header>
  );
};

export default Navbar;
