import { dbConnect } from "@utils/database";
import Post from "@models/post";

export const PUT = async (req, { params }) => {
  const { prompt, tags } = await req.json();
  try {
    const id = params.id;
    await dbConnect();
    const post = await Post.findByIdAndUpdate(id, { prompt, tags })
      .populate("creator", "username email image")
      .populate({
        path: "comments", // Populate the comments
        populate: {
          path: "creator", // Also populate the creator of the comment
          select: "username email image",
        },
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
