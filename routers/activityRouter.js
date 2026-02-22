import express from "express";
import {
    getActivities,
    getActivityById,
    createActivity,
    updateActivity,
    deleteActivity
} from "../controllers/activityController.js";

const activityRouter = express.Router();

activityRouter.get("/", getActivities);
activityRouter.get("/:id", getActivityById);
activityRouter.post("/", createActivity);
activityRouter.put("/:id", updateActivity);
activityRouter.delete("/:id", deleteActivity);

export default activityRouter;
