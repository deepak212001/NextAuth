import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

export async function connectDB() {
  try {
    // await mongoose.connect(process.env.MONGO_URI); // ye error kyuki ye aayega nhi conform karo to hame ! use karte hai to jo jayeha
    await mongoose.connect(process.env.MONGO_URI!);
    const connection = mongoose.connection;

    // connection.on("connected", () => {
    //   console.log("MongoDB connected");
    // });

    connection.on("error", (err) => {
      console.error("MongoDB connection error in try:", err);
      process.exit();
    });
    console.log("MongoDB connected");
  } catch (error) {
    console.error("MongoDB connection error:", error);
  }
}
