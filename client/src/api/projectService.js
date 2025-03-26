import apiClient from "./authService";
import toast from "react-hot-toast";

export const projectService = {
  getAllProjects: async () => {
    try {
      const response = await apiClient.get("/projects");
      return response.data.projects;
    } catch (error) {
      const errorMsg =
        error.response?.data?.message || "Failed to fetch projects";
      toast.error(errorMsg);
      throw error;
    }
  },

  createProject: async (projectData) => {
    try {
      const response = await apiClient.post("/projects", projectData);
      return response.data.project;
    } catch (error) {
      const errorMsg =
        error.response?.data?.message || "Failed to create project";
      toast.error(errorMsg);
      throw error;
    }
  },

  getProjectById: async (projectId) => {
    try {
      const response = await apiClient.get(`/projects/${projectId}`);
      return response.data.project;
    } catch (error) {
      const errorMsg =
        error.response?.data?.message || "Failed to fetch project details";
      toast.error(errorMsg);
      throw error;
    }
  },

  updateProject: async (projectId, projectData) => {
    try {
      const response = await apiClient.patch(
        `/projects/${projectId}`,
        projectData
      );
      return response.data.project;
    } catch (error) {
      const errorMsg =
        error.response?.data?.message || "Failed to update project";
      toast.error(errorMsg);
      throw error;
    }
  },

  deleteProject: async (projectId) => {
    try {
      const response = await apiClient.delete(`/projects/${projectId}`);
      return response.data;
    } catch (error) {
      const errorMsg =
        error.response?.data?.message || "Failed to delete project";
      toast.error(errorMsg);
      throw error;
    }
  },
};

export default projectService;
