import mongoose from "mongoose";

export default async function mongooseLoader() {
  const uri = process.env.MONGO_URI;

  if (!uri) {
    throw new Error("❌ MONGO_URI missing in .env");
  }

  await mongoose.connect(uri);
  console.log("✅ Connected to Local MongoDB");
}
