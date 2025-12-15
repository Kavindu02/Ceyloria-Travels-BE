import mongoose from "mongoose";

const contactSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      trim: true,
    },

    country: {
      type: String,
      required: true,
      trim: true,
    },

    phone: {
      type: String,
      required: true,
      trim: true,
    },

    adults: {
      type: Number,
      required: true,
      min: 0,
    },

    kids: {
      type: Number,
      required: true,
      min: 0,
    },

    infants: {
      type: Number,
      required: true,
      min: 0,
    },

    arrivalDate: {
      type: Date,
      required: true,
    },

    departureDate: {
      type: Date,
      required: true,
    },

    message: {
      type: String,
      required: true,
      trim: true,
    },
  },
  {
    timestamps: true, // createdAt, updatedAt
  }
);

export default mongoose.model("Contact", contactSchema);
