// models/travelPackage.model.js
import mongoose from "mongoose";

const travelPackageSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      default: "Untitled Package",
    },

    shortDescription: {
      type: String,
      default: "",
    },

    description: {
      type: String,
      default: "",
    },

    images: {
      type: [String],
      default: [],
    },

    price: {
      type: Number,
      default: 0,
    },

    ratingText: {
      type: String,
      default: "4.9/5",
    },

    starCount: {
      type: Number,
      default: 5,
    },

    duration: {
      type: String,
      default: "",
    },

    citiesCovered: {
      type: [String],
      default: [],
    },

    highlights: {
      type: [String],
      default: [],
    },

    itinerary: {
      type: [
        {
          day: Number,
          title: String,
          description: String,
        },
      ],
      default: [],
    },

    inclusions: {
      type: [String],
      default: [],
    },

    exclusions: {
      type: [String],
      default: [],
    },

    isCurated: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

const TravelPackage = mongoose.model("travel_packages", travelPackageSchema);
export default TravelPackage;
