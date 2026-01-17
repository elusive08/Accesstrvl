// src/modules/media/index.js
import express from "express";
import mediaRoutes from "./media.routes.js";

const router = express.Router();
router.use("/", mediaRoutes);

export default router;