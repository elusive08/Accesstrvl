import mongoose from "mongoose";

const mediaSchema = new mongoose.Schema(
  {
    url: {
      type: String,
      required: true
    },
    public_id: {
      type: String,
      required: true
    },
    contextTag: {
      type: String,
      default: "general"
    }
  },
  { timestamps: true }
);

export default mongoose.model("Media", mediaSchema);
