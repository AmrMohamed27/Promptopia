import { dbConnect } from "@utils/database";
import User from "@models/user";

export const GET = async (req) => {
  const { userId } = await req.json();
  try {
    await dbConnect();
    const user = await User.findOne({ _id: userId });
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
