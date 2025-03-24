import User from "../models/user.model.js";
import { generateToken } from "../utils/jwt.utils.js";

export const register = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Check if email already exists
    const emailExists = await User.findOne({ email });
    if (emailExists) {
      return res.status(400).json({
        success: false,
        message: "Email already in use",
      });
    }

    // Check if username already exists
    const usernameExists = await User.findOne({ username });
    if (usernameExists) {
      return res.status(400).json({
        success: false,
        message: "Username already taken",
      });
    }

    // Create user
    const user = await User.create({ username, email, password });

    // Generate token
    const token = generateToken({
      userId: user._id,
      username: user.username,
    });

    res.status(201).json({
      success: true,
      user: {
        userId: user._id,
        username: user.username,
        email: user.email,
      },
      token,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error during registration",
      error: process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials",
      });
    }

    // Verify password
    const isPasswordValid = await user.comparePassword(password);
    if (!isPasswordValid) {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials",
      });
    }

    // Generate token
    const token = generateToken({
      userId: user._id,
      username: user.username,
    });

    res.status(200).json({
      success: true,
      user: {
        userId: user._id,
        username: user.username,
        email: user.email,
      },
      token,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error during login",
      error: process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
};
