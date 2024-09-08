import { dbConnect } from "@utils/database";
import Post from "@models/post";

export const POST = async (req) => {
  const { prompt, tags, userId } = await req.json();
  try {
    await dbConnect();
    const newPost = new Post({
      creator: userId,
      prompt,
      tags,
      upvotes: [],
      comments: [],
    });
    await newPost.save();
    return new Response(JSON.stringify(newPost), {
      status: 201,
    });
  } catch (error) {
    console.error(error);
    return new Response(`Error: ${error.message}`, {
      status: 501,
    });
  }
};
