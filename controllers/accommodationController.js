// controllers/accommodationController.js

import Accommodation from "../models/accommodation.js";

// helper: admin guard
function ensureAdmin(req, res) {
  if (!req.user || req.user.role !== "admin") {
    res.status(403).json({ message: "Forbidden: Admins only" });
    return false;
  }
  return true;
}

// =============================================
//  CREATE ACCOMMODATION  (ADMIN ONLY)
// =============================================
export function createAccommodation(req, res) {
  if (!ensureAdmin(req, res)) return;

  console.log("Creating accommodation with body:", req.body); // Debug log

  const accommodation = new Accommodation(req.body);

  accommodation
    .save()
    .then(() => {
      res.json({
        message: "Accommodation added successfully",
        accommodation,
      });
    })
    .catch((error) => {
      res.status(500).json({
        message: "Failed to add accommodation",
        error: error.message,
      });
    });
}

// =============================================
//  GET ALL ACCOMMODATIONS (PUBLIC)
// =============================================
export function getAccommodations(req, res) {
  Accommodation.find()
    .then((accommodations) => {
      res.json(accommodations);
    })
    .catch((error) => {
      res.status(500).json({
        message: "Failed to fetch accommodations",
        error: error.message,
      });
    });
}

// =============================================
//  GET SINGLE ACCOMMODATION (PUBLIC)
// =============================================
export function getAccommodationById(req, res) {
  const id = req.params.id;

  Accommodation.findById(id)
    .then((accommodation) => {
      if (!accommodation) {
        return res.status(404).json({ message: "Accommodation not found" });
      }
      res.json(accommodation);
    })
    .catch((error) => {
      res.status(500).json({
        message: "Failed to fetch accommodation",
        error: error.message,
      });
    });
}

// =============================================
//  UPDATE ACCOMMODATION (ADMIN ONLY)
// =============================================
export function updateAccommodation(req, res) {
  if (!ensureAdmin(req, res)) return;

  const id = req.params.id;

  Accommodation.findByIdAndUpdate(id, req.body, { new: true })
    .then((updated) => {
      if (!updated) {
        return res.status(404).json({ message: "Accommodation not found" });
      }
      res.json({
        message: "Accommodation updated successfully",
        accommodation: updated,
      });
    })
    .catch((error) => {
      res.status(500).json({
        message: "Failed to update accommodation",
        error: error.message,
      });
    });
}

// =============================================
//  DELETE ACCOMMODATION (ADMIN ONLY)
// =============================================
export function deleteAccommodation(req, res) {
  if (!ensureAdmin(req, res)) return;

  const id = req.params.id;

  Accommodation.findByIdAndDelete(id)
    .then((deleted) => {
      if (!deleted) {
        return res.status(404).json({ message: "Accommodation not found" });
      }
      res.json({ message: "Accommodation deleted successfully" });
    })
    .catch((error) => {
      res.status(500).json({
        message: "Failed to delete accommodation",
        error: error.message,
      });
    });
}
