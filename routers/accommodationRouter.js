import express from "express";
import {
  createAccommodation,
  getAccommodations,
  getAccommodationById,
  updateAccommodation,  
  deleteAccommodation,
} from "../controllers/accommodationController.js";

const router = express.Router();

router.post("/", createAccommodation);
router.get("/", getAccommodations);
router.get("/:id", getAccommodationById);
router.put("/:id", updateAccommodation);
router.delete("/:id", deleteAccommodation);

export default router;
