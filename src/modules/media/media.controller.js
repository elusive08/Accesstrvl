import cloudinary from "../../config/cloudinary.js";
import Media from "./model.js";
import asyncHandler from "../../utils/asyncHandler.js";
import { v4 as uuidv4 } from "uuid";

export const uploadMedia = asyncHandler(async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: "No file uploaded" });
  }

  const uploadResult = await new Promise((resolve, reject) => {
    cloudinary.uploader.upload_stream(
      {
        folder: "access-travel/media",
        public_id: uuidv4()
      },
      (error, result) => {
        if (error) reject(error);
        else resolve(result);
      }
    ).end(req.file.buffer);
  });

  const media = await Media.create({
    url: uploadResult.secure_url,
    contextTag: req.body.contextTag || "general"
  });

  res.status(201).json(media);
});
