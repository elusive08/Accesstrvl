import { Router } from "express";
import mediaRoutes from "./media.routes.js";

const router = Router();
router.use("/", mediaRoutes);

export default router;
