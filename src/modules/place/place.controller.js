// src/modules/place/place.controller.js

import mongoose from "mongoose";
import Place from "./place.model.js";
import Media from "../media/media.model.js";

/**
 * Create a new place
 */
export const createPlace = async (req, res) => {
  try {
    const place = await Place.create(req.body);

    return res.status(201).json({
      success: true,
      message: "Place created successfully",
      data: place,
    });
  } catch (error) {
    console.error("Create place error:", error);

    if (error.name === "ValidationError") {
      return res.status(400).json({
        success: false,
        message: "Validation failed",
        errors: Object.values(error.errors).map((err) => err.message),
      });
    }

    return res.status(500).json({
      success: false,
      message: "Failed to create place",
      error: error.message || "Server error",
    });
  }
};

/**
 * Get all places
 */
export const getPlaces = async (req, res) => {
  try {
    const places = await Place.find()
      .populate("media", "url public_id") // populate only needed media fields
      .sort({ createdAt: -1 })
      .lean();

    return res.status(200).json({
      success: true,
      count: places.length,
      data: places,
    });
  } catch (error) {
    console.error("Get places error:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch places",
      error: error.message,
    });
  }
};

/**
 * Get a single place by ID
 */
export const getPlaceById = async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid place ID format",
      });
    }

    const place = await Place.findById(req.params.id)
      .populate("media", "url public_id")
      .lean();

    if (!place) {
      return res.status(404).json({
        success: false,
        message: "Place not found",
      });
    }

    return res.status(200).json({
      success: true,
      data: place,
    });
  } catch (error) {
    console.error("Get place by ID error:", error);
    return res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};

/**
 * Add one or more media items to a place
 * POST /api/places/:id/media
 * Body: { "media": ["mediaId1", "mediaId2"] } or { "media": "mediaId" }
 */
export const addMediaToPlace = async (req, res) => {
  try {
    const { id } = req.params;
    let mediaInput = req.body.media || req.body.mediaId;

    if (!mediaInput) {
      return res.status(400).json({
        success: false,
        message: "media or mediaId is required",
      });
    }

    // Normalize single ID to array
    const mediaIds = Array.isArray(mediaInput) ? mediaInput : [mediaInput];

    // Validate each ID
    if (mediaIds.some((id) => !mongoose.Types.ObjectId.isValid(id))) {
      return res.status(400).json({
        success: false,
        message: "One or more media IDs are invalid (must be 24-character ObjectId)",
      });
    }

    const place = await Place.findById(id);
    if (!place) {
      return res.status(404).json({
        success: false,
        message: "Place not found",
      });
    }

    // Add IDs, avoid duplicates
    place.media = [...new Set([...place.media.map(String), ...mediaIds])];
    await place.save();

    // Return updated place with populated media
    const updatedPlace = await Place.findById(id).populate("media");

    return res.status(200).json({
      success: true,
      message: "Media added to place successfully",
      data: updatedPlace,
    });
  } catch (error) {
    console.error("Add media to place error:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to add media to place",
      error: error.message,
    });
  }
};

/**
 * Filter places by accessibility needs
 */
export const filterPlacesByAccessibility = async (req, res) => {
  try {
    const filters = {};

    if (req.query.wheelchair === "true") {
      filters["accessibility.mobility.wheelchairAccessible"] = true;
    }
    if (req.query.visual === "true") {
      filters["accessibility.visual"] = true;
    }
    if (req.query.hearing === "true") {
      filters["accessibility.hearing"] = true;
    }

    const places = await Place.find(filters)
      .populate("media", "url public_id")
      .sort({ averageRating: -1 })
      .lean();

    return res.status(200).json({
      success: true,
      count: places.length,
      data: places,
    });
  } catch (error) {
    console.error("Filter places error:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to filter places",
      error: error.message,
    });
  }
};