import { dbConnect } from "@utils/database";
import Post from "@models/post";

export const PUT = async (req) => {
  const { postId, comment } = await req.json();
  try {
    await dbConnect();
    await Post.findByIdAndUpdate(postId, {
      $pull: { comments: { _id: comment._id } },
    });
    await Post.findByIdAndUpdate(postId, {
      $push: { comments: comment },
    });
    return new Response(JSON.stringify(comment), {
      status: 200,
    });
  } catch (error) {
    console.error(error);
    return new Response(`Error: ${error.message}`, {
      status: 500,
    });
  }
};
