import mongoose from "mongoose";

let isConnected = false;

export const connectDB = async () => {
  if (isConnected) {
    console.log("Using existing connection");
    return;
  }
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      useUnifiedTopology: true,
    });
    isConnected = true;
    console.log("Connected to MongoDB");
  } catch (err) {
    console.error("Failed to connect to MongoDB", err);
  }
};

export default connectDB;
