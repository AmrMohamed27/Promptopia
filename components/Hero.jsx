const Hero = () => {
  return (
    <section className="flex py-8 md:py-16 px-4 md:px-8 w-full items-start md:items-center justify-center">
      <div className="flex flex-col items-center justify-center gap-8">
        <h1 className="text-4xl md:text-6xl font-extrabold text-center text-pale-blue">
          Discover & Share <br />
          <span className="orange_gradient">AI Powered Prompts</span>
        </h1>
        <p className="text-center text-lg md:text-xl text-pale-blue md:max-w-[65%]">
          Promptopia is an open-source prompting tool for the modern world to
          discover, create and share creative prompts
        </p>
      </div>
    </section>
  );
};

export default Hero;
