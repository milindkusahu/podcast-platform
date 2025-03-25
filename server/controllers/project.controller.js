import Project from "../models/project.model.js";
import Episode from "../models/episode.model.js";

// Get all projects for the current user
export const getAllProjects = async (req, res) => {
  try {
    const projects = await Project.find({ creator: req.user.userId });

    // Populate episode counts for each project
    await Promise.all(
      projects.map((project) => project.populate("episodeCount"))
    );

    return res.status(200).json({
      success: true,
      count: projects.length,
      projects,
    });
  } catch (error) {
    console.error("Get all projects error:", error);
    return res.status(500).json({
      success: false,
      message: "Server error while fetching projects",
      error: process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
};

// Create a new project
export const createProject = async (req, res) => {
  try {
    const { title, description } = req.body;

    const project = await Project.create({
      title,
      description,
      creator: req.user.userId,
    });

    return res.status(201).json({
      success: true,
      project,
    });
  } catch (error) {
    console.error("Create project error:", error);
    return res.status(500).json({
      success: false,
      message: "Server error while creating project",
      error: process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
};

// Get a single project by ID
export const getProject = async (req, res) => {
  try {
    const { id: projectId } = req.params;

    const project = await Project.findOne({
      _id: projectId,
      creator: req.user.userId,
    });

    if (!project) {
      return res.status(404).json({
        success: false,
        message: "Project not found",
      });
    }

    // Populate episode count
    await project.populate("episodeCount");

    // Get episodes for this project
    const episodes = await Episode.find({ project: projectId });

    return res.status(200).json({
      success: true,
      project,
      episodes,
    });
  } catch (error) {
    console.error("Get project error:", error);
    return res.status(500).json({
      success: false,
      message: "Server error while fetching project",
      error: process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
};

// Update a project
export const updateProject = async (req, res) => {
  try {
    const { id: projectId } = req.params;
    const { title, description } = req.body;

    const project = await Project.findOneAndUpdate(
      { _id: projectId, creator: req.user.userId },
      { title, description, lastEdited: new Date() },
      { new: true, runValidators: true }
    );

    if (!project) {
      return res.status(404).json({
        success: false,
        message: "Project not found",
      });
    }

    return res.status(200).json({
      success: true,
      project,
    });
  } catch (error) {
    console.error("Update project error:", error);
    return res.status(500).json({
      success: false,
      message: "Server error while updating project",
      error: process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
};

// Delete a project
export const deleteProject = async (req, res) => {
  try {
    const { id: projectId } = req.params;

    // Find and delete the project
    const project = await Project.findOneAndDelete({
      _id: projectId,
      creator: req.user.userId,
    });

    if (!project) {
      return res.status(404).json({
        success: false,
        message: "Project not found",
      });
    }

    // Delete all associated episodes
    await Episode.deleteMany({ project: projectId });

    return res.status(200).json({
      success: true,
      message: "Project deleted successfully",
    });
  } catch (error) {
    console.error("Delete project error:", error);
    return res.status(500).json({
      success: false,
      message: "Server error while deleting project",
      error: process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
};
