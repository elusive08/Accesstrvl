import Place from "./place.model.js";

/**
 * Create a new place
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
 */
export const getPlaces = async (req, res) => {
  try {
    const places = await Place.find();
    res.json(places);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch places",
      error: error.message
    });
  }
};

/**
 * Add media to place
 * (Week-3 compatible – no Cloudinary dependency here)
 */
export const addMediaToPlace = async (req, res) => {
  try {
    const { id } = req.params;
    const { media } = req.body;

    const place = await Place.findById(id);
    if (!place) {
      return res.status(404).json({ message: "Place not found" });
    }

    place.media = place.media || [];
    place.media.push(media);

    await place.save();
    res.json(place);
  } catch (error) {
    res.status(400).json({
      message: "Failed to add media to place",
      error: error.message
    });
  }
};

/**
 * Accessibility filtering
 */
export const filterPlacesByAccessibility = async (req, res) => {
  try {
    const query = {};

    if (req.query.wheelchair === "true") {
      query["accessibility.wheelchair"] = true;
    }
    if (req.query.visual === "true") {
      query["accessibility.visual"] = true;
    }
    if (req.query.hearing === "true") {
      query["accessibility.hearing"] = true;
    }

    const places = await Place.find(query);
    res.json(places);
  } catch (error) {
    res.status(500).json({
      message: "Failed to filter places",
      error: error.message
    });
  }
};
