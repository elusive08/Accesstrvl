import mongoose from "mongoose";

const tripSchema = new mongoose.Schema(
  {
    destination: {
      type: String,
      required: true
    },

    places: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Place"
      }
    ],

    media: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Media"
      }
    ]
  },
  { timestamps: true }
);

export default mongoose.model("Trip", tripSchema);
