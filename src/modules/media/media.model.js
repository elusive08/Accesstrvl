import mongoose from "mongoose";

const mediaSchema = new mongoose.Schema(
  {
    url: { type: String, required: true },
    contextTag: { type: String }
  },
  { timestamps: true }
);

export default mongoose.model("Media", mediaSchema);
