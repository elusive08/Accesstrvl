import mongoose from "mongoose";

const accessibilitySchema = new mongoose.Schema(
  {
    wheelchair: { type: Boolean, default: false },
    hearing: { type: Boolean, default: false },
    visual: { type: Boolean, default: false }
  },
  { _id: false }
);

const placeSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: String,
    category: {
      type: String,
      required: true,
      enum: ["accommodation", "attraction", "transport", "restaurant"]
    },
    address: { type: String, required: true },
    accessibility: accessibilitySchema
  },
  { timestamps: true }
);

export default mongoose.model("Place", placeSchema);
