// src/config/cloudinary.js
import dotenv from "dotenv";
dotenv.config({ path: ".env" });

import { v2 as cloudinary } from "cloudinary";

const {
  CLOUDINARY_CLOUD_NAME,
  CLOUDINARY_API_KEY,
  CLOUDINARY_API_SECRET
} = process.env;

if (!CLOUDINARY_CLOUD_NAME || !CLOUDINARY_API_KEY || !CLOUDINARY_API_SECRET) {
  console.error("❌ Cloudinary env variables missing");
  console.error({
    CLOUDINARY_CLOUD_NAME,
    CLOUDINARY_API_KEY: CLOUDINARY_API_KEY ? "SET" : "MISSING",
    CLOUDINARY_API_SECRET: CLOUDINARY_API_SECRET ? "SET" : "MISSING"
  });
  process.exit(1);
}

cloudinary.config({
  cloud_name: CLOUDINARY_CLOUD_NAME,
  api_key: CLOUDINARY_API_KEY,
  api_secret: CLOUDINARY_API_SECRET
});

console.log("✅ Cloudinary configured");

export default cloudinary;
