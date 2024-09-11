import { dbConnect } from "@utils/database";
import Comment from "@models/comment";
import Post from "@models/post";

export const POST = async (req, { params }) => {
  try {
    const id = params.id;
    const { text, creator } = await req.json();
    const commentObject = {
      text: text,
      creator: creator,
      createdAt: Date.now(),
      replies: [],
      upvotes: [],
      parentPost: id,
    };
    await dbConnect();
    const newComment = await Comment.create(commentObject);
    await newComment.save();
    const post = await Post.findByIdAndUpdate(id, {
      $addToSet: { comments: newComment },
    });
    await post.save();
    return new Response(JSON.stringify(newComment), {
      status: 200,
    });
  } catch (error) {
    console.error(error);
    return new Response(`Error: ${error.message}`, {
      status: 500,
    });
  }
};

export const DELETE = async (req, { params }) => {
  const id = params.id;
  const { commentId } = await req.json();
  try {
    await dbConnect();
    const deletedComment = await Comment.findByIdAndDelete(commentId);
    await deletedComment.save();
    const post = await Post.findByIdAndUpdate(id, {
      $pull: { comments: commentId },
    });
    await post.save();
    return new Response(JSON.stringify(deletedComment), {
      status: 200,
    });
  } catch (error) {
    console.error(error);
    return new Response(`Error: ${error.message}`, {
      status: 500,
    });
  }
};
