import mongoose from "mongoose";

const blogSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
        },
        excerpt: {
            type: String,
            required: true,
        },
        content: {
            type: String,
            required: true,
        },
        image: {
            type: String,
            required: true,
        },
        author: {
            type: String,
            default: "Ceyloria Team",
        },
        category: {
            type: String,
            required: true,
        },
        anchor: {
            type: String,
            required: true,
        },
        link: {
            type: String,
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

const Blog = mongoose.model("blogs", blogSchema);

export default Blog;
