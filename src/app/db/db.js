import mongoose from "mongoose";

let isConnected;
export const connectDb = async () => {
  try {

    if (isConnected) return;
    const db = await mongoose.connect(process.env.MONGODB_URI);
    isConnected = db.connections[0].readyState;

    console.log("database connected");
  } catch (error) {
    console.log(error);
  }
};
