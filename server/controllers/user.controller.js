import User from "../models/user.model.js";

// Get current user profile
export const getCurrentUser = async (req, res) => {
  try {
    const user = await User.findById(req.user.userId).select("-password");

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    return res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    console.error("Get user error:", error);
    return res.status(500).json({
      success: false,
      message: "Server error while fetching user",
      error: process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
};

// Update user profile
export const updateUser = async (req, res) => {
  try {
    const { username } = req.body;

    // Check if username is already taken
    if (username) {
      const existingUser = await User.findOne({ username });
      if (existingUser && existingUser._id.toString() !== req.user.userId) {
        return res.status(400).json({
          success: false,
          message: "Username already taken",
        });
      }
    }

    const user = await User.findByIdAndUpdate(
      req.user.userId,
      { username },
      { new: true, runValidators: true }
    ).select("-password");

    return res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    console.error("Update user error:", error);
    return res.status(500).json({
      success: false,
      message: "Server error while updating user",
      error: process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
};
