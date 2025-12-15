import mongoose from "mongoose";

const gallerySchema = new mongoose.Schema(
  {
    title: { type: String, required: true },

    imageUrl: { type: String, required: true }, // uploaded image URL

    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },
  },
  { timestamps: true }
);

const Gallery = mongoose.model("gallery", gallerySchema);

export default Gallery;
