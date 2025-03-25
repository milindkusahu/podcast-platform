import express from "express";
import { getCurrentUser, updateUser } from "../controllers/user.controller.js";
import { authenticateUser } from "../middleware/auth.middleware.js";
import {
  validateRequest,
  updateUserSchema,
} from "../middleware/validator.middleware.js";

const router = express.Router();

// Apply authentication middleware to all user routes
router.use(authenticateUser);

router.get("/me", getCurrentUser);
router.patch("/update", validateRequest(updateUserSchema), updateUser);

export default router;
