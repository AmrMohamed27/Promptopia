import CreateForm from "@components/forms/CreateForm";

const Page = () => {
  return (
    <section className="flex py-8 md:py-16 px-4 md:px-8 w-full items-start min-h-screen">
      <div className="w-full flex flex-col gap-16">
        {/* Form */}
        <CreateForm />
      </div>
    </section>
  );
};

export default Page;
