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
  try {
    const response = await axiosInstance.get(`/recipe/${id}`);
    return response?.data?.data;
  } catch (error) {
    throw error;
  }
};

export const rateRecipe = async (id: string, rating: number) => {
  
};


export const getRecipeComments = async (id: string) => {
  try {
    const response = await axiosInstance.get(`/comments/recipe/${id}`);
    console.log('response comments ', response);
    return response.data;
  } catch (error) {
    console.error("Error fetching recipe details:", error);
    throw error;
  }
};

export const createRecipeComment= async (id: string) => {
  
};
