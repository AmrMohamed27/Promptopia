import mongoose from "mongoose";

const connection = { isConnected: 0 }; // track connection status

export const dbConnect = async () => {
  console.log(mongoose.connection.models);
  if (connection.isConnected) {
    console.log("MongoDB is Already Connected");
    return;
  }
  try {
    const db = await mongoose.connect(process.env.MONGODB_URI, {
      dbName: "promptopia",
    });
    connection.isConnected = db.connection.readyState;
    console.log("MongoDB Connected");
  } catch (error) {
    console.error("MongoDB Connection Error: ", error);
  }
};
