import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log(`conn 200`);
  } catch (error) {
    console.error(`Error 500: ${error}`);
    process.exit(1);
  }
};

export default connectDB;
