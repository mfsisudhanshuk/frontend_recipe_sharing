// src/services/recipeService.ts
import { authAxiosInstance } from "./authAxiosInstance";
import axiosInstance from "./axiosInstance";

// NOTE: Add recipe by id service
export const createRecipe = async (data: FormData) => {
  try {
    const response = await authAxiosInstance.post(`/recipe`, data);
    return response?.data;
  } catch (error) {
    throw error;
  }
};

// NOTE: Get all recipes service
export const getAllRecipes = async (ingredient = "") => {
  try {
    const response = await axiosInstance.get("/recipes", {
      params: { ingredient },
    });
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.error || "Failed to fetch recipes");
  }
};

// NOTE: Add recipe by id service
export const getRecipeById = async (id: string) => {
  try {
    const response = await axiosInstance.get(`/recipe/${id}`);
    return response?.data?.data;
  } catch (error) {
    throw error;
  }
};

// NOTE: Add rating recipe service
export const updateRecipeRate = async (id: string, rating: number) => {
  try {
    const response = await axiosInstance.get(`recipes/${id}/rating`);
    return response?.data?.data;
  } catch (error) {
    throw error;
  }
};


// NOTE: Add recipe by id service
export const uploadRecipeImage = async (file: File) => {

  if (!file) throw new Error("Image file is missing.");
 
  const formData = new FormData();
  formData.append("image", file);

  try {
    const response = await authAxiosInstance.post("/upload", formData,{
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response?.data; // Cloudinary image URL
  } catch (error) {
    throw error;
  }
};
