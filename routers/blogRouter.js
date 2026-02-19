import express from "express";
import {
    getBlogs,
    createBlog,
    updateBlog,
    deleteBlog,
    getBlogById,
} from "../controllers/blogController.js";

const blogRouter = express.Router();

blogRouter.get("/", getBlogs);
blogRouter.get("/:id", getBlogById);
blogRouter.post("/", createBlog);
blogRouter.put("/:id", updateBlog);
blogRouter.delete("/:id", deleteBlog);

export default blogRouter;
