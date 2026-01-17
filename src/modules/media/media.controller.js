import Media from "./media.model.js";
import cloudinary from "../../config/cloudinary.js";

/**
 * Upload media to Cloudinary and save metadata
 */
export const uploadMedia = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        message: "Missing required parameter - file"
      });
    }

    const uploadResult = await cloudinary.uploader.upload(
      `data:${req.file.mimetype};base64,${req.file.buffer.toString("base64")}`,
      {
        folder: "access-travel/media"
      }
    );

    const media = await Media.create({
      url: uploadResult.secure_url,
      public_id: uploadResult.public_id,
      contextTag: req.body.contextTag || "general"
    });

    res.status(201).json(media);
  } catch (error) {
    res.status(500).json({
      message: "Media upload failed",
      error: error.message
    });
  }
};

/**
 * Get all uploaded media
 */
export const getAllMedia = async (req, res) => {
  try {
    const media = await Media.find().sort({ createdAt: -1 });
    res.json(media);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch media",
      error: error.message
    });
  }
};
