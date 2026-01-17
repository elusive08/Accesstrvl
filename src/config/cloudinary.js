// src/config/cloudinary.js
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true, // always use https URLs (recommended)
});

console.log("Cloudinary configured:", {
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME ? "loaded" : "missing",
  api_key: process.env.CLOUDINARY_API_KEY ? "loaded" : "missing",
  api_secret: process.env.CLOUDINARY_API_SECRET ? "loaded" : "missing",
});

export default cloudinary;