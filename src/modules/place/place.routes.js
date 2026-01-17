import { Router } from "express";
import {
  createPlace,
  getPlaces,
  getPlaceById,
  addMediaToPlace,
  filterPlacesByAccessibility,
} from "./place.controller.js";

const router = Router();

// Create a new place
router.post("/", createPlace);

// Get all places
router.get("/", getPlaces);

// Search places by accessibility needs
router.get("/search/accessibility", filterPlacesByAccessibility);

// Get single place by ID (must come after specific routes)
router.get("/:id", getPlaceById);

// Add media to a place
router.post("/:id/media", addMediaToPlace);

export default router;