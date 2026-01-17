import mongoose from "mongoose";
import Trip from "./trip.model.js";

export const createTrip = async (req, res) => {
  try {
    const { destination, places = [], media = [] } = req.body;

    if (!destination) {
      return res.status(400).json({ message: "Destination is required" });
    }

    const placeIds = Array.isArray(places) ? places : [places];

    if (placeIds.some(id => !mongoose.Types.ObjectId.isValid(id))) {
      return res.status(400).json({ message: "Invalid place ID" });
    }

    const trip = await Trip.create({
      destination,
      places: placeIds,
      media
    });

    res.status(201).json(trip);
  } catch (err) {
    res.status(500).json({ message: "Failed to create trip", error: err.message });
  }
};

export const getTripById = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid trip ID" });
    }

    const trip = await Trip.findById(id).populate("places").populate("media");

    if (!trip) {
      return res.status(404).json({ message: "Trip not found" });
    }

    res.json(trip);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch trip", error: err.message });
  }
};

export const getTripSuggestions = async (req, res) => {
  try {
    const { destination } = req.query;

    if (!destination) {
      return res.status(400).json({ message: "Destination is required" });
    }

    const trips = await Trip.find({
      destination: new RegExp(destination, "i")
    }).limit(5);

    res.json(trips);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch suggestions", error: err.message });
  }
};
