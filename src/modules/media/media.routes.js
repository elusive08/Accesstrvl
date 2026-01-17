// src/modules/media/media.routes.js

import { Router } from "express";
import upload from "../../middlewares/upload.middleware.js"; // multer + cloudinary middleware
import { uploadMedia, getAllMedia } from "./media.controller.js";

const router = Router();

/**
 * Upload a new media file (image/video) to Cloudinary + save metadata to DB
 * POST /api/media/upload
 * Form-data: file (required)
 */
router.post("/upload", upload.single("file"), uploadMedia);

/**
 * Get all media files (paginated, newest first)
 * GET /api/media?page=1&limit=20
 */
router.get("/", getAllMedia);

// Optional: Quick health/debug endpoint
router.get("/health", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Media routes are active and healthy",
    timestamp: new Date().toISOString(),
  });
});

export default router;