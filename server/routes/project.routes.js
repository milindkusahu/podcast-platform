import express from "express";
import {
  getAllProjects,
  createProject,
  getProject,
  updateProject,
  deleteProject,
} from "../controllers/project.controller.js";
import { authenticateUser } from "../middleware/auth.middleware.js";
import {
  validateRequest,
  projectSchema,
} from "../middleware/validator.middleware.js";

const router = express.Router();

// Authentication middleware for all project routes
router.use(authenticateUser);

router
  .route("/")
  .get(getAllProjects)
  .post(validateRequest(projectSchema), createProject);

router
  .route("/:id")
  .get(getProject)
  .patch(validateRequest(projectSchema), updateProject)
  .delete(deleteProject);

export default router;
