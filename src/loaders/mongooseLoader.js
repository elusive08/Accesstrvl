import mongoose from "mongoose";

export default async function mongooseLoader(retries = 5) {
  const uri = process.env.MONGO_URI;

  if (!uri) {
    throw new Error("MONGO_URI is undefined. dotenv was not loaded correctly.");
  }

  try {
    await mongoose.connect(uri, {
      serverSelectionTimeoutMS: 8000,
      socketTimeoutMS: 45000,
      maxPoolSize: 10,
    });

    console.log("MongoDB connected");
  } catch (error) {
    console.error("MongoDB connection failed:", error.message);

    if (retries > 0) {
      console.log(`Retrying MongoDB connection (${retries})...`);
      await new Promise((res) => setTimeout(res, 4000));
      return mongooseLoader(retries - 1);
    }

    throw error;
  }
}
