// src/services/recipeService.ts
import axiosInstance from "./axiosInstance";

// NOTE: Get all recipes service 
export const getAllRecipes = async (ingredient='') => {
  try {
    const response = await axiosInstance.get("/recipes",{
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


