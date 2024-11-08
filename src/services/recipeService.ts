// src/services/recipeService.ts
import axiosInstance from "./axiosInstance";

// NOTE: Add recipe service 
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

export const getRecipeById = async (id: string) => {
  
};

export const rateRecipe = async (id: string, rating: number) => {
  
};
