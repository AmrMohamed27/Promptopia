import { dbConnect } from "@utils/database";
import Comment from "@models/comment";
import Post from "@models/post";

export const PUT = async (req, { params }) => {
  try {
    const id = params.id;
    const { commentId, userId } = await req.json();
    await dbConnect();
    const comment = await Comment.findByIdAndUpdate(
      commentId,
      {
        $addToSet: { upvotes: userId },
      },
      { new: true }
    );
    await comment.save();
    const post = await Post.findById(id);
    const commentIndex = post.comments.findIndex((c) =>
      c._id.equals(commentId)
    );
    if (commentIndex !== -1) {
      post.comments[commentIndex] = comment;
    }

    await post.save();
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

export const DELETE = async (req, { params }) => {
  try {
    const id = params.id;
    const { commentId, userId } = await req.json();
    await dbConnect();
    const comment = await Comment.findByIdAndUpdate(
      commentId,
      {
        $pull: { upvotes: userId },
      },
      { new: true }
    );
    await comment.save();
    const post = await Post.findById(id);
    const commentIndex = post.comments.findIndex((c) =>
      c._id.equals(commentId)
    );
    if (commentIndex !== -1) {
      post.comments[commentIndex] = comment;
    }

    await post.save();
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
