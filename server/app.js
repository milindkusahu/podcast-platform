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
const PORT = 8082;
const MONGO_URI = process.env.MONGO_URI;

app.use(
  cors({
    origin: process.env.CLIENT_URL,
    allowedHeaders:
      "Origin, X-Requested-With, Content-Type, Accept, Authorization",
    credentials: true,
  })
);

app.use(express.json());

// Routes
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/projects", projectRoutes);
app.use("/api/v1/episodes", episodeRoutes);
app.use("/api/v1/users", userRoutes);

const start = async () => {
  try {
    await connectDB(MONGO_URI);
    app.listen(PORT, () => {
      console.log(`Server is listening on port ${PORT}...`);
      console.log(`Connected to DB...`);
    });
  } catch (error) {
    console.log("Failed to connect to DB or start server");
    console.log(error);
  }
};

// Initialize server
start();

export default app;
