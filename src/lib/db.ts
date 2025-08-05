import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;

export const connectDB = async () => {
  if (!MONGODB_URI) {
    throw new Error("❌ MONGODB_URI is not defined in environment variables.");
  }
  
  if (mongoose.connections[0].readyState) {
    return;
  }
  try {
    await mongoose.connect(MONGODB_URI);
    console.log("✅ Connected to MongoDB");
  } catch (error) {
    console.error("❌ MongoDB connection error:", error);
    throw error;
  }
};
