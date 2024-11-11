import { authAxiosInstance } from "./authAxiosInstance";
import axiosInstance from "./axiosInstance";
// NOTE: Add comment api service 
export const getAllComment = async (id: string) => {
    try {
        const response = await axiosInstance.get(`/comments/recipe/${id}`);
        return response.data;
      } catch (error) {
        throw error;
      }
};

// NOTE: Add comment api service 
export const createComment = async (id: string, comment: string) => {
    try {
        const response = await authAxiosInstance.post(`/comments/recipe/${id}`, {
          comment
        });
        return response.data;
      } catch (error) {
        throw error;
      }
};

