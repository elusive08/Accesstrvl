import { Router } from "express";
import mediaRoutes from "../modules/media/index.js";

const router = Router();

router.use("/media", mediaRoutes);

router.get("/", (_, res) => {
  res.json({ message: "Routes index loaded" });
});

export default router;
