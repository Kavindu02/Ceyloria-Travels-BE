import express from "express";
import { sendContactMail, sendPlanTripMail } from "../controllers/contactController.js";

const router = express.Router();

router.post("/contact", sendContactMail);
router.post("/plan-trip", sendPlanTripMail);

export default router;
