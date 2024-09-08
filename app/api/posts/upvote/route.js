import { dbConnect } from "@utils/database";
import { Types } from "mongoose";
import Post from "@models/post";

export const PUT = async (req) => {
  const { userId, postId } = await req.json();
  try {
    await dbConnect();
    const post = await Post.findByIdAndUpdate(postId, {
      $addToSet: { upvotes: userId },
    });
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

export const DELETE = async (req) => {
  const { userId, postId } = await req.json();
  try {
    await dbConnect();
    const post = await Post.findByIdAndUpdate(postId, {
      $pull: { upvotes: userId },
    });
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
