import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const conn = await mongoose.connect("mongodb+srv://equipmaster_users:*************@cluster0.sdafji4.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log(`Mongo conectado en: ${conn.connection.host}`);
  } catch (error) {
    console.error("Error al conectar con MongoDB Atlas:");
    console.error(error.message);
    process.exit(1);
  }
};

export default connectDB;
