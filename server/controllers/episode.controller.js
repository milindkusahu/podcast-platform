import Episode from "../models/episode.model.js";
import Project from "../models/project.model.js";

// Create a new episode
export const createEpisode = async (req, res) => {
  try {
    const { title, project, source, sourceUrl, transcript } = req.body;

    // Verify project exists and belongs to the user
    const projectExists = await Project.findOne({
      _id: project,
      creator: req.user.userId,
    });

    if (!projectExists) {
      return res.status(404).json({
        success: false,
        message: "Project not found or unauthorized",
      });
    }

    const episode = await Episode.create({
      title,
      project,
      source,
      sourceUrl,
      transcript,
      creator: req.user.userId,
    });

    return res.status(201).json({
      success: true,
      episode,
    });
  } catch (error) {
    console.error("Create episode error:", error);
    return res.status(500).json({
      success: false,
      message: "Server error while creating episode",
      error: process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
};

// Get all episodes for a project
export const getEpisodesByProject = async (req, res) => {
  try {
    const { projectId } = req.params;

    // Verify project exists and belongs to the user
    const projectExists = await Project.findOne({
      _id: projectId,
      creator: req.user.userId,
    });

    if (!projectExists) {
      return res.status(404).json({
        success: false,
        message: "Project not found or unauthorized",
      });
    }

    const episodes = await Episode.find({ project: projectId });

    return res.status(200).json({
      success: true,
      count: episodes.length,
      episodes,
    });
  } catch (error) {
    console.error("Get episodes error:", error);
    return res.status(500).json({
      success: false,
      message: "Server error while fetching episodes",
      error: process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
};

// Get a single episode
export const getEpisode = async (req, res) => {
  try {
    const { id: episodeId } = req.params;

    const episode = await Episode.findById(episodeId).populate("project");

    if (!episode) {
      return res.status(404).json({
        success: false,
        message: "Episode not found",
      });
    }

    // Check if the episode belongs to the user
    if (episode.creator.toString() !== req.user.userId) {
      return res.status(403).json({
        success: false,
        message: "Unauthorized to access this episode",
      });
    }

    return res.status(200).json({
      success: true,
      episode,
    });
  } catch (error) {
    console.error("Get episode error:", error);
    return res.status(500).json({
      success: false,
      message: "Server error while fetching episode",
      error: process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
};

// Update episode (particularly the transcript)
export const updateEpisode = async (req, res) => {
  try {
    const { id: episodeId } = req.params;
    const { title, transcript } = req.body;

    const episode = await Episode.findById(episodeId);

    if (!episode) {
      return res.status(404).json({
        success: false,
        message: "Episode not found",
      });
    }

    // Check if the episode belongs to the user
    if (episode.creator.toString() !== req.user.userId) {
      return res.status(403).json({
        success: false,
        message: "Unauthorized to update this episode",
      });
    }

    // Update only allowed fields
    if (title) episode.title = title;
    if (transcript) episode.transcript = transcript;

    await episode.save();

    return res.status(200).json({
      success: true,
      episode,
    });
  } catch (error) {
    console.error("Update episode error:", error);
    return res.status(500).json({
      success: false,
      message: "Server error while updating episode",
      error: process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
};

// Delete an episode
export const deleteEpisode = async (req, res) => {
  try {
    const { id: episodeId } = req.params;

    const episode = await Episode.findById(episodeId);

    if (!episode) {
      return res.status(404).json({
        success: false,
        message: "Episode not found",
      });
    }

    // Check if the episode belongs to the user
    if (episode.creator.toString() !== req.user.userId) {
      return res.status(403).json({
        success: false,
        message: "Unauthorized to delete this episode",
      });
    }

    await episode.deleteOne();

    return res.status(200).json({
      success: true,
      message: "Episode deleted successfully",
    });
  } catch (error) {
    console.error("Delete episode error:", error);
    return res.status(500).json({
      success: false,
      message: "Server error while deleting episode",
      error: process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
};
