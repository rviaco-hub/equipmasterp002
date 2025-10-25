import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect("mongodb+srv://equipmaster_users:*************@cluster0.sdafji4.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0");
    console.log(`conn 200`);
  } catch (error) {
    console.error(`Error 500: ${error}`);
    process.exit(1);
  }
};

export default connectDB;
