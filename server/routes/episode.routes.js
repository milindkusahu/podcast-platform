import express from "express";
import {
  createEpisode,
  getEpisodesByProject,
  getEpisode,
  updateEpisode,
  deleteEpisode,
} from "../controllers/episode.controller.js";
import { authenticateUser } from "../middleware/auth.middleware.js";
import {
  validateRequest,
  episodeSchema,
  episodeUpdateSchema,
} from "../middleware/validator.middleware.js";

const router = express.Router();

// Apply authentication middleware to all episode routes
router.use(authenticateUser);

router.post("/", validateRequest(episodeSchema), createEpisode);
router.get("/project/:projectId", getEpisodesByProject);
router.get("/:id", getEpisode);
router.patch("/:id", validateRequest(episodeUpdateSchema), updateEpisode);
router.delete("/:id", deleteEpisode);

export default router;
