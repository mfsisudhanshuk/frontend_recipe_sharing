import { useEffect, useState } from "react";
import { RecipeCard } from "../Home/RecipeCard";
import { Button } from "../../components/common/Button";
import { getAllRecipes } from "../../services/recipeService";
import { Loader } from "../../components/common/Loader";
import ErrorMessage from "../../components/common/ErrorMessage";
import { Empty } from "../../components/common/Empty";
interface Recipe {
  _id: string;
  title: string;
  ingredients: string[];
  preparationTime: number;
  steps: string;
  ratings?: [];
  image?: string;
  averageRating: number;
}

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
    } catch (error: any) {
      setError("Failed to fetch recipes: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRecipes();
  }, [searchIngredient, selectedRating, selectedTime]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchIngredient(e.target.value);
  };

  const handleSearchClick = () => {
    fetchRecipes(searchIngredient, selectedTime, selectedRating);
  };

  // Handler for Enter key press
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearchClick();
    }
  };

  const clearFilters = () => {
    setSearchIngredient("");
    setSelectedTime(0);
    setSelectedRating(0);
  };

  if (loading) return <Loader />;
  if (error) return <ErrorMessage message={error} />;

  return (
    <div className="container mx-auto px-4 mt-10">
      <h1 className="text-2xl font-semibold mb-4">Recipes List</h1>
      {/* Search and Filter Box */}
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
        <select
          value={selectedRating}
          onChange={(e) => setSelectedRating(Number(e.target.value))}
          className="w-full md:w-1/5 px-4 py-2 border border-gray-300 rounded-lg"
        >
          <option value={0}>Filter by Rating</option>
          <option value={1}>1 Star & above</option>
          <option value={2}>2 Stars & above</option>
          <option value={3}>3 Stars & above</option>
          <option value={4}>4 Stars & above</option>
          <option value={5}>5 Stars</option>
        </select>

        {/* Time Filter */}
        <select
          value={selectedTime}
          onChange={(e) => setSelectedTime(Number(e.target.value))}
          className="w-full md:w-1/5 px-4 py-2 border border-gray-300 rounded-lg"
        >
          <option value={0}>Filter by Time</option>
          <option value={15}>Up to 15 mins</option>
          <option value={30}>Up to 30 mins</option>
          <option value={45}>Up to 45 mins</option>
          <option value={60}>Up to 60 mins</option>
        </select>

        <Button onClick={handleSearchClick}>Search</Button>
        <Button onClick={clearFilters} className="bg-red-600 hover:bg-red-500">Clear</Button>
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
