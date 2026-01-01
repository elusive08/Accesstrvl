const mongoose = require("mongoose");

const AccessibilityFeatureSchema = new mongoose.Schema({
  key: {
    type: String,
    required: true,
    unique: true,
    lowercase: true
  },
  label: {
    type: String,
    required: true
  },
  category: {
    type: String,
    enum: [
      "mobility",
      "visual",
      "hearing",
      "cognitive",
      "service_animal",
      "sensory"
    ],
    required: true
  },
  description: {
    type: String
  },
  appliesTo: {
    type: [String],
    enum: ["hotel", "restaurant", "attraction", "transport"],
    default: []
  },
  verificationRequired: {
    type: Boolean,
    default: false
  },
  icon: {
    type: String
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model(
  "AccessibilityFeature",
  AccessibilityFeatureSchema
);
