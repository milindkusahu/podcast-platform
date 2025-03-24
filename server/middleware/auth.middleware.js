import { verifyToken } from "../utils/jwt.utils.js";

export const authenticateUser = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({
      success: false,
      message: "Authentication required",
    });
  }

  const token = authHeader.split(" ")[1];

  try {
    const payload = verifyToken(token);

    req.user = {
      userId: payload.userId,
      username: payload.username,
    };
    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Authentication invalid",
    });
  }
};
