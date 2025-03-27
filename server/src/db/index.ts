import mongoose from "mongoose";

const connectDB = async () => {
  try {
    let DB_CONNECTION_STRING = "";
    if (process.env.NODE_ENV === "development") {
      DB_CONNECTION_STRING = process.env.MONGODB_LOCAL_URI!;
    }
    if (process.env.NODE_ENV === "production") {
      DB_CONNECTION_STRING = process.env.MONGODB_URI!;
    }
    const response = await mongoose.connect(DB_CONNECTION_STRING);
    console.log(`DB connected Successsfully. ${response.connection.host}`);
  } catch (error) {
    console.log("Error in connection database: ", error);
    process.exit(1);
  }
};

export default connectDB;
