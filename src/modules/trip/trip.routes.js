import { Router } from "express";
import {
  createTrip,
  getTripById,
  getTripSuggestions
} from "./trip.controller.js";

const router = Router();

router.get("/suggestions", getTripSuggestions); // MUST come first
router.post("/create", createTrip);
router.get("/:id", getTripById);

export default router;
