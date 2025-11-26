// controllers/travelPackageController.js

import TravelPackage from "../models/travelPackage.js";

// Create Package
export function createPackage(req, res) {
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

// Get All Packages
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

// Get One Package
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

// Update Package
export function updatePackage(req, res) {
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

// Delete Package
export function deletePackage(req, res) {
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
