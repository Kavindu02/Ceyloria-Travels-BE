
import express from "express";

import {
  createPackage,
  getAllPackages,
  getPackage,
  updatePackage,
  deletePackage,
} from "../controllers/travelPackageController.js";

const packageRouter = express.Router();

packageRouter.post("/", createPackage);
packageRouter.get("/", getAllPackages);
packageRouter.get("/:id", getPackage);
packageRouter.put("/:id", updatePackage);
packageRouter.delete("/:id", deletePackage);

export default packageRouter;
