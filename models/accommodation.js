import mongoose from "mongoose";

const packageSchema = new mongoose.Schema({
  name: {
    // e.g., Standard, Deluxe
    type: String,
    required: true,
  },
  pricePerNight: {
    // price for this package
    type: Number,
    required: true,
  },
  description: {
    type: String,
    default: "",
  },
  amenities: {
    type: [String], // e.g., wifi, breakfast, pool
    default: [],
  },
});

const accommodationSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    pricePerNight: {
      type: Number,
      required: true,
    },
    type: {
      type: String, // hotel, villa, guesthouse, etc.
      required: true,
    },
    description: {
      type: String,
      default: "",
    },
    images: {
      type: [String], // array of image URLs
      default: [],
    },
    packages: {
      type: [packageSchema],
      default: [],
    },
    isAvailable: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

const Accommodation = mongoose.model("accommodations", accommodationSchema);

export default Accommodation;
