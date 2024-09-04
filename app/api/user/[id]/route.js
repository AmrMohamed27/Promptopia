import { dbConnect } from "@utils/database";
import User from "@models/user";

export const GET = async (req, { params }) => {
  const userId = params.id;
  try {
    await dbConnect();
    const user = await User.findOne({ _id: userId });
    if (!user) {
      return new Response("User not found", { status: 404 });
    }
    return new Response(JSON.stringify(user), {
      status: 200,
    });
  } catch (error) {
    console.error(error);
    return new Response(`Error: ${error.message}`, {
      status: 500,
    });
  }
};
