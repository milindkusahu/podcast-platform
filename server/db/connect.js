import mongoose from "mongoose";

const connectDB = (url) => {
  return mongoose.connect(url, {
    serverSelectionTimeoutMS: 5000,
    socketTimeoutMS: 45000,
  });
};

export default connectDB;
