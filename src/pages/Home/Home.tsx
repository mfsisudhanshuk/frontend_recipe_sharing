import { useEffect, useState } from "react";
import { RecipeCard } from "../Home/RecipeCard";
import { Button } from "../../components/common/Button";
import { getAllRecipes } from "../../services/recipeService";
import { Loader } from "../../components/common/Loader";
import ErrorMessage from "../../components/common/ErrorMessage";
import { Empty } from "../../components/common/Empty";

interface Recipe {
  id: number;
  title: string;
  ingredients: string[];
  preparationTime: number;
  steps: string;
  rating: number;
  image?: string;
}

export const Home = () => {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [searchIngredient, setSearchIngredient] = useState<string>("");

  const fetchRecipes = async (ingredient = "") => {
    setLoading(true);
    setError(null);
    try {
       // Delay the loading state for 1 minute
    await new Promise(resolve => setTimeout(resolve, 60000))
      const data = await getAllRecipes(ingredient);
      setRecipes(data.data);
    } catch (error: any) {
      setError("Failed to fetch recipes: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRecipes();
  }, []);

  if (loading) return <Loader />;
  if (error) return <ErrorMessage message={error} />;

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchIngredient(e.target.value);
  };

  const handleSearchClick = () => {
    fetchRecipes(searchIngredient);
  };

   // Handler for Enter key press
   const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearchClick();
    }
  };

  return (
    <div className="container mx-auto px-4 mt-10">
      <h1 className="text-2xl font-semibold mb-4">Recipes List</h1>
      {/* Search box */}
      <div className="mb-6 flex flex-col md:flex-row md:items-center gap-4">
        <input
          type="text"
          value={searchIngredient}
          onChange={handleSearchChange}
          onKeyDown={handleKeyDown}
          placeholder="Search recipes..."
          className="w-full md:w-1/3 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
        />
        <Button onClick={handleSearchClick}>Search</Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {recipes.map((recipe) => (
          <RecipeCard key={recipe.id} recipe={recipe} />
        ))}
        {recipes.length === 0 && <Empty />}
      </div>
    </div>
  );
};
