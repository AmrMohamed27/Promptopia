"use client";

import { TypeAnimation } from "react-type-animation";

const Hero = () => {
  return (
    <section className="flex py-8 md:py-16 px-4 md:px-8 w-full items-start md:items-center justify-center">
      <div className="flex flex-col items-center justify-center gap-8">
        <h1 className="text-3xl sm:text-4xl md:text-6xl font-extrabold text-center text-pale-blue dark:text-white">
          Discover & Share <br />
          <TypeAnimation
            className="orange_gradient typewriter hidden xl:block py-4"
            sequence={[
              "AI Powered Prompts for \nDevs",
              1000,
              "AI Powered Prompts for \nDesigners",
              1000,
              "AI Powered Prompts for \nWriters",
              1000,
              "AI Powered Prompts for \nEveryone",
              1000,
            ]}
            speed={25}
            repeat={Infinity}
            cursor={false}
            preRenderFirstString={true}
          />
          <span className="block xl:hidden orange_gradient">
            AI Powered Prompts for Everyone
          </span>
        </h1>
        <p className="text-center text-lg md:text-xl text-pale-blue dark:text-white/50 md:max-w-[65%]">
          Promptopia is an open-source prompting tool for the modern world to
          discover, create and share creative prompts
        </p>
      </div>
    </section>
  );
};

export default Hero;
