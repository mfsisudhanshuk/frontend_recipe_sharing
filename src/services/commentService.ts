import { authAxiosInstance } from "./authAxiosInstance";
import axiosInstance from "./axiosInstance";
// NOTE: Add comment api service 
export const getAllComment = async (id: string) => {
    try {
        const response = await axiosInstance.get(`/comments/recipe/${id}`);
        console.log('response comments in service ', response);
        return response.data;
      } catch (error) {
        console.error("Error fetching recipe details:", error);
        throw error;
      }
};

// NOTE: Add comment api service 
export const createComment = async (id: string, comment: string) => {
    try {
        const response = await authAxiosInstance.post(`/comments/recipe/${id}`, {
          comment
        });
        console.log('response comments ', response);
        return response.data;
      } catch (error) {
        console.error("Error fetching recipe details:", error);
        throw error;
      }
};

