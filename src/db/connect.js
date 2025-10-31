import mongoose from "mongoose";
import { DB_NAME } from "../constants/dbName.js";

const connect = async () => {
  try {
    const connection = await mongoose.connect(`${process.env.MONGO_URI}/${DB_NAME}`);
    console.log(`✅ MongoDB Connected: ${connection.connection.host}`);
  } catch (error) {
    console.error("❌ MongoDB connection error:", error.message);
    process.exit(1);
  }
}

export default connect;