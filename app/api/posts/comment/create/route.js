import { dbConnect } from "@utils/database";
import Post from "@models/post";
import mongoose from "mongoose";

export const POST = async (req) => {
  const { newComment: comment, postId, user } = await req.json();
  try {
    await dbConnect();
    const commentId = new mongoose.Types.ObjectId();
    const newComment = { ...comment, _id: commentId };
    await Post.findByIdAndUpdate(postId, {
      $push: { comments: newComment },
    }).populate("creator");
    const finalComment = {
      ...newComment,
      creator: user,
    };
    return new Response(JSON.stringify(finalComment), {
      status: 201,
    });
  } catch (error) {
    console.error(error);
    return new Response(`Error: ${error.message}`, {
      status: 501,
    });
  }
};
