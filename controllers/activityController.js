import Activity from "../models/activity.js";

export const getActivities = async (req, res) => {
    try {
        const activities = await Activity.find().sort({ createdAt: -1 });
        res.json(activities);
    } catch (error) {
        res.status(500).json({ message: "Failed to fetch activities", error: error.message });
    }
};

export const createActivity = async (req, res) => {
    try {
        const newActivity = new Activity(req.body);
        await newActivity.save();
        res.status(201).json({ message: "Activity created successfully", activity: newActivity });
    } catch (error) {
        res.status(500).json({ message: "Failed to create activity", error: error.message });
    }
};

export const updateActivity = async (req, res) => {
    try {
        const updatedActivity = await Activity.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedActivity) return res.status(404).json({ message: "Activity not found" });
        res.json({ message: "Activity updated successfully", activity: updatedActivity });
    } catch (error) {
        res.status(500).json({ message: "Failed to update activity", error: error.message });
    }
};

export const deleteActivity = async (req, res) => {
    try {
        const deletedActivity = await Activity.findByIdAndDelete(req.params.id);
        if (!deletedActivity) return res.status(404).json({ message: "Activity not found" });
        res.json({ message: "Activity deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Failed to delete activity", error: error.message });
    }
};

export const getActivityById = async (req, res) => {
    try {
        const activity = await Activity.findById(req.params.id);
        if (!activity) return res.status(404).json({ message: "Activity not found" });
        res.json(activity);
    } catch (error) {
        res.status(500).json({ message: "Failed to fetch activity", error: error.message });
    }
};
