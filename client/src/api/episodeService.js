import apiClient from "./authService";
import toast from "react-hot-toast";

export const episodeService = {
  getEpisodesByProjectId: async (projectId) => {
    try {
      const response = await apiClient.get(`/episodes/project/${projectId}`);
      return response.data.episodes;
    } catch (error) {
      const errorMsg =
        error.response?.data?.message || "Failed to fetch episodes";
      toast.error(errorMsg);
      throw error;
    }
  },

  createEpisode: async (episodeData) => {
    try {
      const response = await apiClient.post("/episodes", episodeData);
      return response.data.episode;
    } catch (error) {
      const errorMsg =
        error.response?.data?.message || "Failed to create episode";
      toast.error(errorMsg);
      throw error;
    }
  },

  getEpisodeById: async (episodeId) => {
    try {
      const response = await apiClient.get(`/episodes/${episodeId}`);
      return response.data.episode;
    } catch (error) {
      const errorMsg =
        error.response?.data?.message || "Failed to fetch episode details";
      toast.error(errorMsg);
      throw error;
    }
  },

  updateEpisode: async (episodeId, episodeData) => {
    try {
      const response = await apiClient.patch(
        `/episodes/${episodeId}`,
        episodeData
      );
      return response.data.episode;
    } catch (error) {
      const errorMsg =
        error.response?.data?.message || "Failed to update episode";
      toast.error(errorMsg);
      throw error;
    }
  },

  deleteEpisode: async (episodeId) => {
    try {
      const response = await apiClient.delete(`/episodes/${episodeId}`);
      return response.data;
    } catch (error) {
      const errorMsg =
        error.response?.data?.message || "Failed to delete episode";
      toast.error(errorMsg);
      throw error;
    }
  },
};

export default episodeService;
