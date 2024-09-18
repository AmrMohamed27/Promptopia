import Link from "next/link";

const Button = ({ color, href, className, children, onClick }) => {
  const orangeGradient =
    "bg-gradient-to-r from-orange-600 to-amber-600 text-white py-2 px-6 hover:cursor-pointer text-sm flex items-center justify-center " +
    className;
  const blueGradient =
    "bg-gradient-to-r from-blue-600 to-cyan-600 text-white py-2 px-6 hover:cursor-pointer text-sm flex items-center justify-center " +
    className;
  const classes = `${
    color === "white"
      ? "bg-white text-black hover:bg-black hover:text-white border-2 border-black dark:hover:border-white rounded-full py-2 px-6 font-bold transition-all duration-300 hover:cursor-pointer text-sm flex items-center justify-center"
      : color === "black"
        ? "bg-black text-white hover:bg-white hover:text-black border-2 border-transparent dark:border-white hover:border-black rounded-full py-2 px-6 font-bold transition-all duration-300 hover:cursor-pointer text-sm flex items-center justify-center"
        : color === "orange"
          ? `${orangeGradient}`
          : `${blueGradient}`
  }  ${className}`;

  return (
    <>
      {href ? (
        <Link href={href} className={classes}>
          <span>{children}</span>
        </Link>
      ) : (
        <button onClick={onClick} className={classes}>
          <span>{children}</span>
        </button>
      )}
    </>
  );
};

export default Button;
