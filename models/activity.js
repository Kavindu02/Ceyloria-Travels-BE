import mongoose from "mongoose";

const activitySchema = new mongoose.Schema(
    {
        title: {
            type: String, // e.g. "Whale Watching", "Tea Plantation Tour"
            required: true,
        },
        category: {
            type: String, // e.g. "Water Sports", "Nature"
            required: true,
        },
        image: {
            type: String, // Main Hero Image
            required: true,
        },
        tagline: {
            type: String,
            required: true,
        },
        description: {
            type: String, // Detailed overview
            required: true,
        },
        items: [
            {
                title: { type: String, required: true },
                description: { type: String, required: true },
                image: { type: String, required: true },
            },
        ],
    },
    {
        timestamps: true,
    }
);

const Activity = mongoose.model("activities", activitySchema);

export default Activity;
