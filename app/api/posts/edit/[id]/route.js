import { dbConnect } from "@utils/database";
import Post from "@models/post";

export const PUT = async (req, { params }) => {
  const { prompt, tags } = await req.json();
  try {
    const id = params.id;
    await dbConnect();
    const post = await Post.findOneAndUpdate({ _id: id }, { prompt, tags });
    await post.save();
    return new Response(JSON.stringify(post), {
      status: 200,
    });
  } catch (error) {
    console.error(error);
    return new Response(`Error: ${error.message}`, {
      status: 500,
    });
  }
};
