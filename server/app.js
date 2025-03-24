import express from "express";
import connectDB from "./db/connect.js";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = 8082;
const MONGO_URI = process.env.MONGO_URI;

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World");
});

const start = async () => {
  try {
    await connectDB(MONGO_URI);
    app.listen(PORT, () => {
      console.log(`Server is listening on port ${PORT}...`);
      console.log(`Connected to DB at ${MONGO_URI}`);
    });
  } catch (error) {
    console.log("Failed to connect to DB or start server");
    console.log(error);
  }
};

// Initialize server
start();

export default app;
