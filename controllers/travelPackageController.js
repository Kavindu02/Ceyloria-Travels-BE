// controllers/travelPackageController.js

import TravelPackage from "../models/travelPackage.js";



// helper: admin guard
function ensureAdmin(req, res) {
  if (!req.user || req.user.role !== "admin") {
    res.status(403).json({ message: "Forbidden: Admins only" });
    return false;
  }
  return true;
}

//  CREATE PACKAGE (ADMIN ONLY) 
export function createPackage(req, res) {
  if (!ensureAdmin(req, res)) return;

  const pkg = new TravelPackage(req.body);

  pkg
    .save()
    .then(() => {
      res.json({ message: "Travel Package Created Successfully" });
    })
    .catch((error) => {
      res.status(500).json({
        message: "Failed to create travel package",
        error: error.message,
      });
    });
}

//  GET ALL PACKAGES 
export function getAllPackages(req, res) {
  TravelPackage.find()
    .then((packages) => {
      res.json(packages);
    })
    .catch((error) => {
      res.status(500).json({
        message: "Failed to fetch travel packages",
        error: error.message,
      });
    });
}

// controllers/travelPackageController.js
export function getPackage(req, res) {
  const id = req.params.id;

  TravelPackage.findById(id)
    .then((pkg) => {
      if (!pkg) {
        return res.status(404).json({ message: "Package Not Found" });
      }
      res.json(pkg);
    })
    .catch((error) => {
      res.status(500).json({
        message: "Failed to fetch package",
        error: error.message,
      });
    });
}


//  UPDATE PACKAGE (ADMIN ONLY)
export function updatePackage(req, res) {
  if (!ensureAdmin(req, res)) return;

  const id = req.params.id;

  TravelPackage.findByIdAndUpdate(id, req.body, { new: true })
    .then((updated) => {
      if (!updated) {
        return res.status(404).json({ message: "Package Not Found" });
      } 
      res.json({
        message: "Package Updated Successfully",
        package: updated,
      });
    })
    .catch((error) => {
      res.status(500).json({
        message: "Failed to update package",
        error: error.message,
      });
    });
}

//  DELETE PACKAGE (ADMIN ONLY)
export function deletePackage(req, res) {
  if (!ensureAdmin(req, res)) return;

  const id = req.params.id;

  TravelPackage.findByIdAndDelete(id)
    .then((deleted) => {
      if (!deleted) {
        return res.status(404).json({ message: "Package Not Found" });
      }
      res.json({ message: "Package Deleted Successfully" });
    })
    .catch((error) => {
      res.status(500).json({
        message: "Failed to delete package",
        error: error.message,
      });
    });
}
