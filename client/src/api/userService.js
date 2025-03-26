import apiClient from "./authService";
import toast from "react-hot-toast";

export const userService = {
  getCurrentUser: async () => {
    try {
      const response = await apiClient.get("/users/me");
      return response.data.user;
    } catch (error) {
      const errorMsg =
        error.response?.data?.message || "Failed to fetch user profile";
      toast.error(errorMsg);
      throw error;
    }
  },

  updateUser: async (userData) => {
    try {
      const response = await apiClient.patch("/users/update", userData);
      return response.data.user;
    } catch (error) {
      const errorMsg =
        error.response?.data?.message || "Failed to update profile";
      toast.error(errorMsg);
      throw error;
    }
  },
};

export default userService;
