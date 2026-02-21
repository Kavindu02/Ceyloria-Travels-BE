
import DestinationCategory from "../models/destinationCategory.js";

// Create a new category
export const createDestinationCategory = async (req, res) => {
  try {
    const newCategory = new DestinationCategory(req.body);
    await newCategory.save();
    res.status(201).json({ message: "Destination Category created successfully", data: newCategory });
  } catch (error) {
    res.status(500).json({ message: "Failed to create category", error: error.message });
  }
};

// Get all categories
export const getAllDestinationCategories = async (req, res) => {
  try {
    const categories = await DestinationCategory.find().sort({ createdAt: -1 });
    res.status(200).json(categories);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch categories", error: error.message });
  }
};

// Get single category by ID (or custom 'id' field)
export const getDestinationCategoryById = async (req, res) => {
  try {
    // Try to find by _id first, if fails or logic dictates, find by custom 'id'
    const category = await DestinationCategory.findById(req.params.id);
    if (!category) {
        // Fallback: search by custom 'id' string if param is not ObjectId or not found
        const cat = await DestinationCategory.findOne({ id: req.params.id });
        if(!cat) return res.status(404).json({ message: "Category not found" });
        return res.status(200).json(cat);
    }
    res.status(200).json(category);
  } catch (error) {
    // If invalid ObjectId, try searching by custom 'id' string
    try {
        const cat = await DestinationCategory.findOne({ id: req.params.id });
        if(!cat) return res.status(404).json({ message: "Category not found" });
        return res.status(200).json(cat);
    } catch (err) {
        res.status(500).json({ message: "Failed to fetch category", error: error.message });
    }
  }
};

// Update category
export const updateDestinationCategory = async (req, res) => {
  try {
    const updatedCategory = await DestinationCategory.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedCategory) {
      return res.status(404).json({ message: "Category not found" });
    }
    res.status(200).json({ message: "Category updated successfully", data: updatedCategory });
  } catch (error) {
    res.status(500).json({ message: "Failed to update category", error: error.message });
  }
};

// Delete category
export const deleteDestinationCategory = async (req, res) => {
  try {
    const deletedCategory = await DestinationCategory.findByIdAndDelete(req.params.id);
    if (!deletedCategory) {
      return res.status(404).json({ message: "Category not found" });
    }
    res.status(200).json({ message: "Category deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete category", error: error.message });
  }
};
