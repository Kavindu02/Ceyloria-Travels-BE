import express from "express";
import {
  createDestinationCategory,
  getAllDestinationCategories,
  getDestinationCategoryById,
  updateDestinationCategory,
  deleteDestinationCategory,
} from "../controllers/destinationController.js";

const destinationRouter = express.Router();

destinationRouter.post("/", createDestinationCategory);
destinationRouter.get("/", getAllDestinationCategories);
destinationRouter.get("/:id", getDestinationCategoryById);
destinationRouter.put("/:id", updateDestinationCategory);
destinationRouter.delete("/:id", deleteDestinationCategory);

export default destinationRouter;
