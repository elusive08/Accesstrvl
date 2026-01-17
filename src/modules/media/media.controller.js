// src/modules/media/media.controller.js

import Media from "./media.model.js";
import cloudinary from "../../config/cloudinary.js";

/**
 * Upload media file to Cloudinary and save metadata to MongoDB
 * @route   POST /api/media/upload
 * @access  Private (add auth middleware later if needed)
 */
export const uploadMedia = async (req, res) => {
  try {
    // 1. Check if file was received
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "No file received",
        details: "Please attach a file using form-data with key 'file'",
      });
    }

    console.log("File received:", {
      originalname: req.file.originalname,
      mimetype: req.file.mimetype,
      size: req.file.size,
    });

    // 2. Upload to Cloudinary using stream (memory storage)
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder: "access-travel/media",
        resource_type: "image",
        allowed_formats: ["jpg", "jpeg", "png", "webp"],
      },
      async (error, result) => {
        if (error) {
          console.error("Cloudinary upload error:", error);
          return res.status(500).json({
            success: false,
            message: "Cloudinary upload failed",
            error: error.message || "Upload stream error",
          });
        }

        // 3. Save metadata to database
        const media = await Media.create({
          url: result.secure_url,
          public_id: result.public_id,
          resource_type: result.resource_type || "image",
          format: result.format,
          width: result.width,
          height: result.height,
          bytes: result.bytes,
          original_filename: req.file.originalname,
          // Optional links (uncomment when you have auth)
          // uploadedBy: req.user?._id,
          // placeId: req.body.placeId,
          // reviewId: req.body.reviewId,
        });

        return res.status(201).json({
          success: true,
          message: "Media uploaded and saved successfully",
          data: media,
        });
      }
    );

    // Pipe buffer into stream
    uploadStream.end(req.file.buffer);

  } catch (error) {
    console.error("Media upload error:", error);
    return res.status(500).json({
      success: false,
      message: "Server error during media upload",
      error: error.message || "Unknown error",
    });
  }
};

/**
 * Get all media files (paginated, newest first)
 * @route   GET /api/media?page=1&limit=20
 * @access  Public (add auth if needed)
 */
export const getAllMedia = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;
    const skip = (page - 1) * limit;

    const mediaFiles = await Media.find()
      .sort({ createdAt: -1 }) // newest first
      .skip(skip)
      .limit(limit)
      .populate("uploadedBy", "name email") // optional
      .lean();

    const total = await Media.countDocuments();

    return res.status(200).json({
      success: true,
      count: mediaFiles.length,
      total,
      pagination: {
        currentPage: page,
        totalPages: Math.ceil(total / limit),
        hasNext: page * limit < total,
      },
      data: mediaFiles,
    });
  } catch (error) {
    console.error("Get all media error:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch media",
      error: error.message || "Server error",
    });
  }
};