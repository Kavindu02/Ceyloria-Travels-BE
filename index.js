import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import cors from "cors";
import userRouter from "./routers/userRouter.js";
import User from "./models/user.js";
import packageRouter from "./routers/travelPackageRoutes.js";
import galleryRouter from "./routers/galleryRouter.js";
import accommodationRouter from "./routers/accommodationRouter.js";
import contactRouter from "./routers/contactRouter.js";




dotenv.config();

const app = express();

app.use(
  cors({
    origin: [
      
      "http://localhost:5173" // (optional) local dev frontend if you test locally
    ],
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

// handle preflight (OPTIONS) requests
app.use(cors());  
app.use(bodyParser.json());

const connectionString = process.env.MONGO_URL;

mongoose
  .connect(connectionString)
  .then(() => {
    console.log("Connected to database");
  })
  .catch((error) => {
    console.error("Failed to connect to the database:", error);
  });

//JWT Middleware
app.use(async (req, res, next) => {
  if (req.method === "OPTIONS") return next();

  const value = req.header("Authorization");
  if (!value) return next();

  const token = value.replace("Bearer ", "");
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (!decoded.userId && decoded.email) {
      try {
        const u = await User.findOne({ email: decoded.email })
          .select("_id role isBlock isEmailVerified image")
          .lean();
        if (!u) {
          return res.status(401).json({ message: "Unauthorized: user not found" });
        }
        decoded.userId = u._id.toString();
        // optional refresh
        decoded.role = u.role ?? decoded.role;
        decoded.isBlock = u.isBlock ?? decoded.isBlock;
        decoded.isEmailVerified = u.isEmailVerified ?? decoded.isEmailVerified;
        decoded.image = u.image ?? decoded.image;
      } catch (lookupErr) {
        console.error("Auth user lookup failed:", lookupErr.message);
        return res.status(500).json({ message: "Auth lookup failed" });
      }
    }

    req.user = decoded;
    // console.log("Decoded token (ensured userId):", req.user);
    next();
  } catch (err) {
    console.error("JWT verification error:", err.message);
    return res.status(401).json({ message: "Unauthorized: Invalid or expired token" });
  }
});

app.use("/users", userRouter);
app.use("/packages", packageRouter);
app.use("/gallery", galleryRouter);
app.use("/accommodations", accommodationRouter);
app.use(express.json());
app.use("/api", contactRouter);


app.listen(5000, () => {
  console.log("server started");
});
