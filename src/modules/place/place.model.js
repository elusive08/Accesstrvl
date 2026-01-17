// src/modules/place/place.model.js

import mongoose from "mongoose";

const accessibilitySchema = new mongoose.Schema(
  {
    mobility: {
      wheelchairAccessible: Boolean,
      stepFreeEntrance: Boolean,
      elevatorAvailable: Boolean,
      accessibleRestroom: Boolean,
      doorWidthCm: Number,
    },
    visual: {
      brailleSignage: Boolean,
      audioGuides: Boolean,
      highContrastSignage: Boolean,
    },
    hearing: {
      signLanguageSupport: Boolean,
      captioningAvailable: Boolean,
      visualAlerts: Boolean,
    },
    sensory: {
      quietSpaces: Boolean,
      sensoryFriendlyHours: Boolean,
      lowLighting: Boolean,
    },
    serviceAnimalsAllowed: Boolean,
  },
  { _id: false }
);

const placeSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    description: { type: String, trim: true },
    category: {
      type: String,
      required: true,
      enum: ["accommodation", "attraction", "restaurant", "transport"],
      index: true, // faster queries by category
    },
    address: { type: String, trim: true },

    // Media references (array of ObjectIds to Media model)
    media: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Media",
      },
    ],

    accessibility: accessibilitySchema,
  },
  {
    timestamps: true,
    toJSON: { virtuals: true, versionKey: false }, // hide __v
    toObject: { virtuals: true, versionKey: false },
  }
);

// Optional: virtual for populated media count (nice for API responses)
placeSchema.virtual("mediaCount").get(function () {
  return this.media ? this.media.length : 0;
});

export default mongoose.model("Place", placeSchema);