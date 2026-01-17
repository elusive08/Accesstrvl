import { Router } from "express";
import multer from "multer";
import {
  uploadMedia,
  getAllMedia
} from "./media.controller.js";

const router = Router();

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 5 * 1024 * 1024 }
});

/**
 * Media routes
 */
router.post("/upload", upload.single("file"), uploadMedia);
router.get("/", getAllMedia);

export default router;
