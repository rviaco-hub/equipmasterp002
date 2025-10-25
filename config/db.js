import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`conn 200`);
  } catch (error) {
    console.error(`Error 500`);
    process.exit(1);
  }
};

export default connectDB;
