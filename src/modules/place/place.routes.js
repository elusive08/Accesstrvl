import { Router } from "express";
import {
  createPlace,
  getPlaces,
  addMediaToPlace,
  filterPlacesByAccessibility
} from "./place.controller.js";

const router = Router();

/**
 * Place routes
 */
router.post("/", createPlace);
router.get("/", getPlaces);
router.post("/:id/media", addMediaToPlace);
router.get("/search/accessibility", filterPlacesByAccessibility);

export default router;
