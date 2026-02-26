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
import blogRouter from "./routers/blogRouter.js";
import destinationRouter from "./routers/destinationRouter.js";
import activityRouter from "./routers/activityRouter.js";





dotenv.config();

const app = express();

app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://sdk-travels-frontend.vercel.app"
    ],
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true
  })
);

app.use(express.json());

app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

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
    next();
  } catch (err) {
    console.error("JWT verification error:", err.message);
    return res.status(401).json({ message: "Unauthorized: Invalid or expired token" });
  }
});

// Routes
app.use("/users", userRouter);
app.use("/packages", packageRouter);
app.use("/gallery", galleryRouter);
app.use("/accommodations", accommodationRouter);
app.use("/blogs", blogRouter);
app.use("/blogs", blogRouter);
app.use("/destinations", destinationRouter);
app.use("/activities", activityRouter);
app.use("/api", contactRouter);


const port = process.env.PORT || 5001;
app.listen(port, () => {
  console.log(`server started on port ${port}`);
});

