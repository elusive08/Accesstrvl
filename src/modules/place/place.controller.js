import Place from "./place.model.js";

/**
 * Create a new place
 * POST /api/places
 */
export const createPlace = async (req, res) => {
  try {
    const place = await Place.create(req.body);
    res.status(201).json(place);
  } catch (error) {
    res.status(400).json({
      message: "Failed to create place",
      error: error.message
    });
  }
};

/**
 * Get all places
 * GET /api/places
 */
export const getPlaces = async (req, res) => {
  try {
    const places = await Place.find();
    res.status(200).json(places);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch places",
      error: error.message
    });
  }
};

/**
 * Add media to an existing place
 * POST /api/places/:id/media
 */
export const addMediaToPlace = async (req, res) => {
  try {
    const { id } = req.params;
    const { media } = req.body;

    if (!media || !Array.isArray(media)) {
      return res.status(400).json({
        message: "Media array is required"
      });
    }

    const place = await Place.findById(id);

    if (!place) {
      return res.status(404).json({
        message: "Place not found"
      });
    }

    place.media.push(...media);
    await place.save();

    res.status(200).json(place);
  } catch (error) {
    res.status(500).json({
      message: "Failed to add media",
      error: error.message
    });
  }
};

/**
 * Filter places by accessibility needs
 * GET /api/places/search/accessibility
 */
export const filterPlacesByAccessibility = async (req, res) => {
  try {
    const filters = {};

    if (req.query.wheelchairAccessible === "true") {
      filters["accessibility.mobility.wheelchairAccessible"] = true;
    }

    if (req.query.serviceAnimalsAllowed === "true") {
      filters["accessibility.serviceAnimalsAllowed"] = true;
    }

    if (req.query.brailleSignage === "true") {
      filters["accessibility.visual.brailleSignage"] = true;
    }

    const places = await Place.find(filters);
    res.status(200).json(places);
  } catch (error) {
    res.status(500).json({
      message: "Failed to filter places",
      error: error.message
    });
  }
};
