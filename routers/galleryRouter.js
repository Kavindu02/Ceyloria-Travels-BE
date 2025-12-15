import express from "express";
import {
  createGalleryItem,
  getGallery,
  deleteGalleryItem,
} from "../controllers/galleryController.js";

const galleryRouter = express.Router();

galleryRouter.post("/", createGalleryItem);   // admin only
galleryRouter.get("/", getGallery);
galleryRouter.delete("/:id", deleteGalleryItem); // admin only

export default galleryRouter;
