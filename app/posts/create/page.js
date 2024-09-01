import CreateForm from "@components/CreateForm";

const page = () => {
  return (
    <section className="flex py-8 md:py-16 px-4 md:px-8 w-full items-start mb-32">
      <div className="w-full flex flex-col gap-16">
        {/* Heading */}
        <div className="flex flex-col items-start justify-center gap-8">
          <h1 className="text-5xl md:text-6xl blue_gradient font-extrabold">
            Create a Post
          </h1>
          <p className="text-lg md:text-xl text-pale-blue md:max-w-[62%]">
            Create and share amazing prompts with the world, and let your
            imagination run wild.
          </p>
        </div>
        {/* Form */}
        <CreateForm />
      </div>
    </section>
  );
};

export default page;
