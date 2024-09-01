import { dbConnect } from "@utils/database";
import Post from "@models/post";

export const DELETE = async (req) => {
  const { postId } = await req.json();
  console.log(postId);
  try {
    await dbConnect();
    await Post.findByIdAndDelete(postId)
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
    return new Response(null, {
      status: 200,
    });
  } catch (error) {
    console.error(error);
    return new Response(`Error: ${error.message}`, {
      status: 500,
    });
  }
};
