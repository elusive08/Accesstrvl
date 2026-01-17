import { Router } from "express";
import upload from "../../middlewares/upload.middleware.js";
import { uploadMedia, getAllMedia } from "./media.controller.js";

const router = Router();

router.post(
  "/upload",
  upload.single("file"), // ⬅️ NON-NEGOTIABLE
  uploadMedia
);

router.get("/", getAllMedia);

export default router;
