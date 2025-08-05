import mongoose from "mongoose";

const db = async () => {
  // That means it is already connected to database.
  if (mongoose.connection.readyState >= 1) return;
  // If not, we are going to connect await mongoose and we
  // give the connection string
  await mongoose.connect(process.env.DATABASE as string);
};

export default db;
