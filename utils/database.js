import mongoose from "mongoose";

let isConnected = false; // track connection status

export const dbConnect = async () => {
  mongoose.set("strictQuery", true);
  mongoose.set("strictPopulate", false);
  if (isConnected) {
    console.log("MongoDB is Already Connected");
    return;
  }
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      dbName: "promptopia",
    });
    isConnected = true;
    console.log("MongoDB Connected");
  } catch (error) {
    console.error("MongoDB Connection Error: ", error);
  }
};
