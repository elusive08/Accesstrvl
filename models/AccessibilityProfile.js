import mongoose from "mongoose";

const AccessibilityProfileSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true
    },

    mobility: {
      wheelchairUser: { type: Boolean, default: false },
      needsRamp: { type: Boolean, default: false },
      needsElevator: { type: Boolean, default: false }
    },

    visual: {
      blind: { type: Boolean, default: false },
      lowVision: { type: Boolean, default: false },
      brailleRequired: { type: Boolean, default: false }
    },

    hearing: {
      deaf: { type: Boolean, default: false },
      captionsRequired: { type: Boolean, default: false }
    },

    cognitive: {
      autismFriendly: { type: Boolean, default: false },
      simpleNavigation: { type: Boolean, default: false }
    },

    serviceAnimal: {
      hasServiceAnimal: { type: Boolean, default: false }
    },

    sensory: {
      lowNoise: { type: Boolean, default: false },
      lowLight: { type: Boolean, default: false }
    }
  },
  { timestamps: true }
);

export default mongoose.model(
  "AccessibilityProfile",
  AccessibilityProfileSchema
);