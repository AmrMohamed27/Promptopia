import { dbConnect } from "@utils/database";
import Post from "@models/post";

export const DELETE = async (req) => {
  const { commentId, postId } = await req.json();
  console.log(postId);
  try {
    await dbConnect();
    const post = await Post.findByIdAndUpdate(postId, {
      $pull: { comments: { _id: commentId } },
    })
      .populate("creator", "username email image")
      .populate({
        path: "comments", // Populate the comments
        populate: {
          path: "creator", // Also populate the creator of the comment
          select: "username email image",
        },
      });
    return new Response(post, {
      status: 200,
    });
  } catch (error) {
    console.error(error);
    return new Response(`Error: ${error.message}`, {
      status: 500,
    });
  }
};
