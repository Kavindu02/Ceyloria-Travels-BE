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
  console.log("Create Package Body:", JSON.stringify(req.body, null, 2));

  const pkg = new TravelPackage(req.body);

  pkg
    .save()
    .then(() => {
      res.json({ message: "Travel Package Created Successfully" });
    })
    .catch((error) => {
      console.error("Create Package Error:", error);
      if (error.name === "ValidationError") {
        const messages = Object.values(error.errors).map(val => val.message);
        return res.status(400).json({
          message: "Validation Error: " + messages.join(", "),
        });
      }
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
      console.error("Get All Packages Error:", error);
      res.status(500).json({
        message: "Failed to fetch travel packages",
        error: error.message,
      });
    });
}

//  GET SINGLE PACKAGE
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
      console.error("Get Package Error:", error);
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
      console.error("Update Package Error:", error);
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
      console.error("Delete Package Error:", error);
      res.status(500).json({
        message: "Failed to delete package",
        error: error.message,
      });
    });
}

// GET CURATED PACKAGES
export function getCuratedPackages(req, res) {
  TravelPackage.find({ isCurated: true })
    .then((packages) => {
      res.json(packages);
    })
    .catch((error) => {
      console.error("Get Curated Packages Error:", error);
      res.status(500).json({
        message: "Failed to fetch curated packages",
        error: error.message,
      });
    });
}

// UPDATE CURATED PACKAGES (Set which packages are curated)
export async function updateCuratedPackages(req, res) {
  if (!ensureAdmin(req, res)) return;

  const { packageIds } = req.body; // Expecting an array of exactly 3 IDs

  if (!Array.isArray(packageIds) || packageIds.length > 3) {
    return res.status(400).json({ message: "Please provide up to 3 package IDs" });
  }

  try {
    // Reset all curated flags
    await TravelPackage.updateMany({}, { isCurated: false });

    // Set curated flags for selected IDs
    await TravelPackage.updateMany(
      { _id: { $in: packageIds } },
      { isCurated: true }
    );

    res.json({ message: "Curated packages updated successfully" });
  } catch (error) {
    console.error("Update Curated Packages Error:", error);
    res.status(500).json({
      message: "Failed to update curated packages",
      error: error.message,
    });
  }
}
