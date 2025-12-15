import Gallery from "../models/galleryModel.js";

// Create new gallery image (Admin Only)
export async function createGalleryItem(req, res) {
  try {
    // admin guard
    if (!req.user || req.user.role !== "admin") {
      return res.status(403).json({ message: "Admins only" });
    }

    const { title, imageUrl } = req.body;

    if (!title || !imageUrl) {
      return res.status(400).json({ message: "Title and Image are required" });
    }

    const galleryItem = new Gallery({
      title,
      imageUrl,
      createdBy: req.user.userId,
    });

    await galleryItem.save();

    res.json({ message: "Image added to gallery", data: galleryItem });
  } catch (err) {
    res.status(500).json({ message: "Failed to create gallery item", error: err });
  }
}

// get all gallery images
export async function getGallery(req, res) {
  try {
    const items = await Gallery.find().sort({ createdAt: -1 });
    res.json(items);
  } catch (err) {
    res.status(500).json({ message: "Failed to load gallery", error: err });
  }
}

// delete gallery image (Admin Only)
export async function deleteGalleryItem(req, res) {
  try {
    if (!req.user || req.user.role !== "admin") {
      return res.status(403).json({ message: "Admins only" });
    }

    const id = req.params.id;

    await Gallery.findByIdAndDelete(id);

    res.json({ message: "Gallery item deleted" });
  } catch (err) {
    res.status(500).json({ message: "Delete failed", error: err });
  }
}
