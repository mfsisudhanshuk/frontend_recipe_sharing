import { FC } from "react";
import { Link } from "react-router-dom";

interface Recipe {
  id: number;
  title: string;
  ingredients: string[];
  preparationTime: number;
  image?: string;
}

interface RecipeCardProps {
  recipe: Recipe;
}

export const RecipeCard: FC<RecipeCardProps> = ({ recipe }) => {
  return (
    <Link to={`/recipe/${recipe.id}`} className="block">
      <div className="border rounded-lg p-4 shadow-md bg-white">
        <img
          src={recipe.image || "/placeholder.jpg"} //TODO : Update with placeholder image..
          alt={recipe.title}
          className="w-full h-48 object-cover rounded-md mb-4"
        />
        <h2 className="text-lg font-semibold mb-2">{recipe.title}</h2>
        <p className="text-sm text-gray-500">
          Preparation Time: {recipe.preparationTime} mins
        </p>
        <p className="text-sm mt-2">
          Ingredients: {recipe.ingredients.join(", ")}
        </p>
      </div>
    </Link>
  );
};
