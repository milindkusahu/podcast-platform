import express from "express";
import cors from "cors";
import connectDB from "./db/connect.js";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.routes.js";
import projectRoutes from "./routes/project.routes.js";
import episodeRoutes from "./routes/episode.routes.js";
import userRoutes from "./routes/user.routes.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8082;
const MONGO_URI = process.env.MONGO_URI;
const isVercel = process.env.VERCEL === "1";

app.use(
  cors({
    origin: process.env.CLIENT_URL,
    allowedHeaders:
      "Origin, X-Requested-With, Content-Type, Accept, Authorization",
    credentials: true,
  })
);

app.use(express.json());

app.get("/api/health", (req, res) => {
  res.status(200).json({
    status: "ok",
    environment: process.env.NODE_ENV,
    timestamp: new Date().toISOString(),
  });
});

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/projects", projectRoutes);
app.use("/api/v1/episodes", episodeRoutes);
app.use("/api/v1/users", userRoutes);

app.use((err, res) => {
  console.error("Global error handler:", err);
  res.status(500).json({
    error: "Internal Server Error",
    message: process.env.NODE_ENV === "development" ? err.message : undefined,
  });
});

app.use((req, res) => {
  res.status(404).json({ error: "Not Found", path: req.path });
});

const start = async () => {
  try {
    await connectDB(MONGO_URI);

    if (!isVercel) {
      app.listen(PORT, () => {
        console.log(`Server is listening on port ${PORT}...`);
        console.log(`Connected to DB...`);
      });
    } else {
      console.log("Running on Vercel, skipping explicit listen call");
    }
  } catch (error) {
    console.log("Failed to connect to DB or start server");
    console.log(error);

    if (isVercel) {
      console.error("Error in serverless environment:", error);
    } else {
      process.exit(1);
    }
  }
};

if (isVercel) {
  connectDB(MONGO_URI).catch((err) => {
    console.error("DB connection error in serverless context:", err);
  });
} else {
  start();
}

export default app;
