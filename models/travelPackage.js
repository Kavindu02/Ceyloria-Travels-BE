// models/travelPackage.model.js
import mongoose from "mongoose";

const travelPackageSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },

    shortDescription: {
      type: String,
      required: true,
    },

    description: {
      type: String,
      required: true,
    },

    images: {
      type: [String],
      required: true,
    },

    price: {
      type: Number,
      required: true,
    },

    duration: {
      type: String, // e.g. "5 Days / 4 Nights"
      required: true,
    },

    citiesCovered: {
      type: [String],
      required: true,
    },

    highlights: {
      type: [String],
      required: true,
    },

    itinerary: [
      {
        day: Number,
        title: String,
        description: String,
      },
    ],

    inclusions: {
      type: [String],
      required: true,
    },

    exclusions: {
      type: [String],
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

const TravelPackage = mongoose.model("travel_packages", travelPackageSchema);
export default TravelPackage;
