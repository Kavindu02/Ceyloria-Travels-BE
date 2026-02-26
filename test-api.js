import mongoose from "mongoose";
import dotenv from "dotenv";
import TravelPackage from "./models/travelPackage.js";

dotenv.config();

async function test() {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("Connected to DB");
    
    const curated = await TravelPackage.find({ isCurated: true });
    console.log("Curated count:", curated.length);
    
    const all = await TravelPackage.find().limit(1);
    console.log("Package sample found:", !!all[0]);
    
    process.exit(0);
  } catch (err) {
    console.error("TEST FAILED:", err);
    process.exit(1);
  }
}

test();
