'use client';

import { useEffect, useState } from "react";
import { RecipeCard } from "./RecipeCard";
import { Button } from "./common/Button";

import { Loader } from "./common/Loader";
import ErrorMessage from "./common/ErrorMessage";
import { Empty } from "./common/Empty";
import { Select } from "./common/Select";
import {
  RATING_FILTER_OPTIONS,
  PREPARATION_TIME_FILTER_OPTIONS,
  mockRecipes,
} from "../utils/constants";
interface Recipe {
  id: string;
  title: string;
  ingredients: string[];
  preparationTime: number;
  steps: string;
  ratings?: [];
  image?: string;
  averageRating: number;
  createdBy:string;
}


// Mock API function
const getAllRecipes = async (
    ingredient = "",
    time = 0,
    rating = 0
  ): Promise<{ data: Recipe[] }> => {
    let filteredRecipes = mockRecipes;
  
    // Filter by ingredient
    if (ingredient) {
      filteredRecipes = filteredRecipes.filter((recipe) =>
        recipe.ingredients.some((ing) =>
          ing.toLowerCase().includes(ingredient.toLowerCase())
        )
      );
    }
  
    // Filter by preparation time
    if (time > 0) {
      filteredRecipes = filteredRecipes.filter(
        (recipe) => recipe.preparationTime <= time
      );
    }
  
    // Filter by rating
    if (rating > 0) {
      filteredRecipes = filteredRecipes.filter(
        (recipe) => recipe.averageRating >= rating
      );
    }
  
    return new Promise((resolve) => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      setTimeout(() => resolve({ data: filteredRecipes as any}), 500);
    });
  };
  
  export const Home = () => {
    const [recipes, setRecipes] = useState<Recipe[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [searchIngredient, setSearchIngredient] = useState<string>("");
    const [selectedTime, setSelectedTime] = useState<number>(0);
    const [selectedRating, setSelectedRating] = useState<number>(0);
  
    const fetchRecipes = async (ingredient = "", time = 0, rating = 0) => {
      setLoading(true);
      setError(null);
      try {
        const data = await getAllRecipes(ingredient, time, rating);
        setRecipes(data.data);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (error: any) {
        setError("Failed to fetch recipes: " + error.message);
      } finally {
        setLoading(false);
      }
    };
  
    useEffect(() => {
      fetchRecipes();
    }, [selectedRating, selectedTime]);
  
    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setSearchIngredient(e.target.value);
    };
  
    const handleSearchClick = () => {
      fetchRecipes(searchIngredient, selectedTime, selectedRating);
    };
  
    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Enter") {
        handleSearchClick();
      }
    };
  
    const clearFilters = () => {
      setSearchIngredient("");
      setSelectedTime(0);
      setSelectedRating(0);
      fetchRecipes();
    };
  
    if (loading) return <Loader />;
    if (error) return <ErrorMessage message={error} />;
  
    return (
      <div className="container mx-auto px-4 mt-10">
        <h1 className="text-2xl font-semibold mb-4">Recipes List</h1>
        <div className="mb-6 flex flex-col md:flex-row md:items-center gap-4">
          {/* Search box */}
          <input
            type="text"
            value={searchIngredient}
            onChange={handleSearchChange}
            onKeyDown={handleKeyDown}
            placeholder="Search by ingredient..."
            className="w-full md:w-1/3 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
          />
  
          {/* Rating Filter */}
          <Select
            value={selectedRating}
            onChange={(e) => setSelectedRating(Number(e.target.value))}
            options={RATING_FILTER_OPTIONS}
            placeholder="Filter by Rating"
          />
  
          {/* Time Filter */}
          <Select
            value={selectedTime}
            onChange={(e) => setSelectedTime(Number(e.target.value))}
            options={PREPARATION_TIME_FILTER_OPTIONS}
            placeholder="Filter by Time"
          />
  
          <Button onClick={handleSearchClick}>Search</Button>
          <Button onClick={clearFilters} className="bg-red-600 hover:bg-red-500">
            Clear
          </Button>
        </div>
  
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" >
          {recipes.map((recipe) => (
            <RecipeCard key={recipe.id} recipe={recipe} />
          ))}
          {recipes.length === 0 && <Empty />}
        </div>
      </div>
    );
  };
