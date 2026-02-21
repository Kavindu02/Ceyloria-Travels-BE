import mongoose from "mongoose";

const destinationCategorySchema = new mongoose.Schema(
  {
    id: {
      type: String, // e.g. "shores", "cultural" - for URL params
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    title: {
      type: String,
      required: true,
    },
    tagline: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    destinations: [
      {
        title: { type: String, required: true },
        description: { type: String, required: true },
        image: { type: String, required: true },
        // Optional fields if needed later
        // imgSide: { type: String, default: "right" }
      },
    ],
  },
  {
    timestamps: true,
  }
);

const DestinationCategory = mongoose.model(
  "destination_categories",
  destinationCategorySchema
);

export default DestinationCategory;
