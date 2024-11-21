"use client";

import { Button } from "@/app/components/common/Button";
import { Empty } from "@/app/components/common/Empty";
import ErrorMessage from "@/app/components/common/ErrorMessage";
import { Loader } from "@/app/components/common/Loader";
import { Select } from "@/app/components/common/Select";
import { RecipeCard } from "@/app/components/RecipeCard";
import { PREPARATION_TIME_FILTER_OPTIONS, RATING_FILTER_OPTIONS } from "@/app/utils/constants";
import { useEffect, useState } from "react";

export const dummyRecipes = [
  {
    _id: "1",
    title: "Spaghetti Carbonara",
    ingredients: ["Spaghetti", "Eggs", "Pancetta", "Parmesan", "Pepper"],
    preparationTime: 20,
    steps: "Boil pasta, cook pancetta, mix with eggs and cheese, combine.",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS6griJPF5pkyzay8ROTaVoGw4fMiUVp3FwX9KBv3maUT4xbxNI3zv2YeGgvN2JnDk8Y94&usqp=CAU",
    ratings: [4, 5, 3],
    averageRating: 4.0,
  },
  {
    _id: "2",
    title: "Chicken Curry",
    ingredients: ["Chicken", "Curry Powder", "Onions", "Garlic", "Tomatoes"],
    preparationTime: 40,
    steps: "Sauté onions and garlic, add chicken and spices, simmer with tomatoes.",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSuYIOU-H88klcyoaRzOnfLNfQApsinGVVXJw&s",
    ratings: [5, 4, 5, 4],
    averageRating: 4.5,
  },
  {
    _id: "3",
    title: "Caesar Salad",
    ingredients: ["Lettuce", "Croutons", "Parmesan", "Caesar Dressing"],
    preparationTime: 10,
    steps: "Chop lettuce, add croutons and cheese, toss with dressing.",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQpPxJ3Iuj2aTztKtlflr3e1gG-j1fP-qr2Ag&s",
    ratings: [3, 4, 2],
    averageRating: 3.0,
  },
];

interface Recipe {
  _id: string;
  title: string;
  ingredients: string[];
  preparationTime: number;
  steps: string;
  image?: string;
  ratings?: number[];
  averageRating: number;
}

const Home = () => {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [searchIngredient, setSearchIngredient] = useState<string>("");
  const [selectedTime, setSelectedTime] = useState<number>(0);
  const [selectedRating, setSelectedRating] = useState<number>(0);

  useEffect(() => {
    setLoading(true);
    try {
      // Set the dummy data as recipes
      setRecipes(dummyRecipes);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      setError(`Failed to load recipes ${error}`);
    } finally {
      setLoading(false);
    }
  }, []);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchIngredient(e.target.value);
  };

  const handleSearchClick = () => {
    const filteredRecipes = dummyRecipes.filter((recipe) =>
      recipe.ingredients.some((ingredient) =>
        ingredient.toLowerCase().includes(searchIngredient.toLowerCase())
      )
    );
    setRecipes(filteredRecipes);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") handleSearchClick();
  };

  const clearFilters = () => {
    setSearchIngredient("");
    setSelectedTime(0);
    setSelectedRating(0);
    setRecipes(dummyRecipes); // Reset to original data
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

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {recipes.map((recipe) => (
          <RecipeCard key={recipe?._id} recipe={recipe} />
        ))}
        {recipes.length === 0 && <Empty />}
      </div>
    </div>
  );
};

export default Home;
