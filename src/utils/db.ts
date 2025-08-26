import mongoose from "mongoose";

const db = async () => {
  if (mongoose.connection.readyState >= 1) return;

  await mongoose.connect(process.env.DATABASE as string);
};

export default db;
