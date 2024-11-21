'use client';

import { FC, useState } from "react";
import { Toast } from "./common/Toast";
import Image from "next/image";
import Link from "next/link";
import { Button } from "./common/Button";
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

interface RecipeCardProps {
  recipe: Recipe;
}

export const RecipeCard: FC<RecipeCardProps> = ({ recipe }) => {
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [userRating, setUserRating] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);
  // Handle rating change
  const handleRatingChange = (rating: number) => {
    setUserRating(rating);
  };

  // Handle rating submission
  const handleRatingSubmit = async () => {
    if (userRating < 1 || userRating > 5) {
      alert("Please select a rating between 1 and 5");
      return;
    }

    console.log('rating clickec ');
    setLoading(true);
    // try {
    //   const data = await rateRecipe(recipe._id, userRating);
    //   setSuccessMessage(data?.message);
    // } catch (error: any) {
    //   setError(error.message);
    // } finally {
    //   setLoading(false);
    // }
  };

  return (
    <>
      {" "}
      {error && (
        <Toast message={error} type="error" onClose={() => setError(null)} />
      )}
      {successMessage && (
        <Toast
          message={successMessage}
          type="success"
          onClose={() => setSuccessMessage(null)}
        />
      )}
      <div className="border rounded-lg p-4 shadow-md bg-white">
        <Link href={`/recipe/${recipe._id}`} className="block mb-4">
          <Image
            src={recipe?.image || "/placeholder.jpg"}
            alt={recipe?.title}
            className="w-full h-48 object-cover rounded-md mb-4"
            width={200}
            height={300}
          />
          <h2 className="text-lg font-semibold mb-2">{recipe.title}</h2>
          <p className="text-sm text-gray-500">
            Preparation Time: {recipe.preparationTime} mins
          </p>
          <p className="text-sm mt-2">
            Ingredients: {recipe.ingredients.join(", ")}
          </p>
        </Link>

        {/* Rating UI */}
        <div className="flex items-center gap-2 mt-4">
          <p className="text-sm">Rate this recipe:</p>
          <select
            value={userRating}
            onChange={(e) => handleRatingChange(Number(e.target.value))}
            className="px-2 py-1 border rounded"
          >
            <option value={0}>Select</option>
            {[1, 2, 3, 4, 5].map((rate) => (
              <option key={rate} value={rate}>
                {rate}
              </option>
            ))}
          </select>
          <Button
            onClick={handleRatingSubmit}
            disabled={loading}
            className="ml-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            {loading ? "Submitting..." : "Submit"}
          </Button>
        </div>

        {/* Display Average Rating */}
        <div className="mt-2 text-sm">
          <p>
            Average Rating: {recipe?.averageRating} ({recipe?.ratings?.length}{" "}
            ratings)
          </p>
        </div>
      </div>
    </>
  );
};