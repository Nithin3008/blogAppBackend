import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONG_URL);
    console.log("db is connected");
  } catch (error) {
    console.log(error);
  }
};

export default connectDB;
