import { Router } from "express";
import upload from "../../middlewares/upload.middleware.js";
import { uploadMedia } from "./media.controller.js";

const router = Router();

router.post(
  "/upload",
  upload.single("file"),
  uploadMedia
);

export default router;
