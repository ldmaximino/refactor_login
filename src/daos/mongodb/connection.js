import mongoose from "mongoose";
import "dotenv/config";

const URI_MONGODB = process.env.URI_MONGODB || "127.0.0.1:27017/ecommerce";

export const initMongoDB = async () => {
  try {
    mongoose.set("strictQuery", false);
    await mongoose.connect(URI_MONGODB);
    console.log("Connected to MongoDB 🔥🔥");
  } catch (error) {
    console.log(error);
  }
};
