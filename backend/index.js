import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";

import connectDB from "./utils/db.js";

import userRoute from "./routes/user.route.js";
import companyRoute from "./routes/company.route.js";
import jobRoute from "./routes/job.route.js";
import applicationRoute from "./routes/application.route.js";

dotenv.config();

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// CORS (Localhost Only)
app.use(
  cors({
    origin: "https://job-portal-mern-tan.vercel.app",
    credentials: true,
  })
);

// Health Check
app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Job Portal Backend API is Running 🚀",
  });
});

// Routes
app.use("/api/v1/user", userRoute);
app.use("/api/v1/company", companyRoute);
app.use("/api/v1/job", jobRoute);
app.use("/api/v1/application", applicationRoute);

// Invalid Route
app.use("*", (req, res) => {
  res.status(404).json({
    success: false,
    message: "Route Not Found",
  });
});

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  try {
    await connectDB();

    app.listen(PORT, () => {
      console.log(`✅ Server Running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.log("❌ Server Failed to Start");
    console.error(error);
    process.exit(1);
  }
};

startServer();