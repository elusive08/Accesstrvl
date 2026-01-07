import mongoose from "mongoose";

/**
 * Media sub-schema
 */
const mediaSchema = new mongoose.Schema(
  {
    url: { type: String, required: true },
    type: {
      type: String,
      enum: ["image", "video"],
      default: "image"
    },
    description: String
  },
  { _id: false }
);

/**
 * Accessibility sub-schema
 */
const accessibilitySchema = new mongoose.Schema(
  {
    mobility: {
      wheelchairAccessible: Boolean,
      stepFreeEntrance: Boolean,
      elevatorAvailable: Boolean,
      accessibleRestroom: Boolean,
      doorWidthCm: Number
    },

    visual: {
      brailleSignage: Boolean,
      audioGuides: Boolean,
      highContrastSignage: Boolean
    },

    hearing: {
      signLanguageSupport: Boolean,
      captioningAvailable: Boolean,
      visualAlerts: Boolean
    },

    sensory: {
      quietSpaces: Boolean,
      sensoryFriendlyHours: Boolean,
      lowLighting: Boolean
    },

    serviceAnimalsAllowed: Boolean
  },
  { _id: false }
);

/**
 * Place schema
 */
const placeSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: String,
    category: { type: String, required: true },
    address: String,

    media: [mediaSchema],          // ← COMMA REQUIRED HERE
    accessibility: accessibilitySchema
  },
  { timestamps: true }
);

export default mongoose.model("Place", placeSchema);
