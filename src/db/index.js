import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const connecttionInstance = await mongoose.connect(process.env.MONGODB_URI);
    console.log(
      "/n MONGODB connected DBHOST:",
      connecttionInstance.connection.host,
    );
  } catch (error) {
    console.log("MONGODB connection FAILED!!", error);
  }
};

export default connectDB;
