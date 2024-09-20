import CreateForm from "@components/forms/CreateForm";
import LoadingCircle from "@components/common/LoadingCircle";
import { fetchPostById } from "@utils/api/fetch";

const Page = async ({ params }) => {
  const id = params.id;
  const post = await fetchPostById(id);
  return (
    <section className="flex py-8 md:py-16 px-4 md:px-8 w-full items-start min-h-screen">
      <div className="w-full flex flex-col gap-16">
        {/* Form */}
        {post ? (
          <CreateForm
            initialPrompt={post.prompt}
            initialTagsString={post.tags.join(", ")}
            isEdit={true}
            postId={id}
          />
        ) : (
          <LoadingCircle />
        )}
      </div>
    </section>
  );
};

export default Page;
