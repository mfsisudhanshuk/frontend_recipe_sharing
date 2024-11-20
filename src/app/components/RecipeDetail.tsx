'use client';

import { useEffect, useState } from "react";
import { CommentForm } from "./CommentRecipe";
import { Comment } from "./Comment";
import { Loader } from "./common/Loader";
import ErrorMessage from "./common/ErrorMessage";
import Image from "next/image";

interface User {
  email: string;
  name: string;
  _id: string;
}
interface CommentType {
  user: User;
  comment: string;
  createdAt: string;
}

interface Recipe {
  id: string;
  title: string;
  preparationTime: string;
  ingredients: string[];
  steps: string;
  rating: string;
  image: string;
}

export const RecipeDetail = () => {
  // Mocked `id` to simulate route parameter
  const id = "dummy-recipe-id";
  
  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [comments, setComments] = useState<CommentType[]>([]);

  const addComment = async (userId: string, commentText: string) => {
    if (!id) return;
    try {
      setLoading(true);
      // Simulate adding a comment
      const newComment: CommentType = {
        user: {
          email: "dummyuser@example.com",
          name: "Dummy User",
          _id: "dummy-user-id",
        },
        comment: commentText,
        createdAt: new Date().toISOString(),
      };
      setComments((prevComments) => [newComment, ...prevComments]);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      setError("Failed to add comment.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const fetchRecipeDetails = async () => {
      try {
        // Simulate fetching recipe details
        const dummyRecipe: Recipe = {
          id: "dummy-recipe-id",
          title: "Dummy Recipe",
          preparationTime: "30",
          ingredients: ["Ingredient 1", "Ingredient 2", "Ingredient 3"],
          steps: "1. Do this.\n2. Do that.\n3. Enjoy your recipe.",
          rating: "42",
          image: "https://via.placeholder.com/600x400?text=Dummy+Recipe",
        };

        // Simulate fetching comments
        const dummyComments: CommentType[] = [
          {
            user: { email: "user1@example.com", name: "User 1", _id: "1" },
            comment: "This is a dummy comment.",
            createdAt: new Date().toISOString(),
          },
          {
            user: { email: "user2@example.com", name: "User 2", _id: "2" },
            comment: "Another dummy comment.",
            createdAt: new Date().toISOString(),
          },
        ];

        setRecipe(dummyRecipe);
        setComments(dummyComments);
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (err) {
        setError("Failed to fetch recipe details or comments.");
      } finally {
        setLoading(false);
      }
    };

    fetchRecipeDetails();
  }, [id]);

  if (loading) return <Loader />;
  if (error) return <ErrorMessage message={error} />;

  return (
    <div className="max-w-4xl mx-auto p-6">
      {/* Full-width image */}
      <Image
        src={recipe?.image || ''}
        alt={recipe?.title || 'Not found'}
        className="w-full h-1/3 object-cover rounded-lg shadow-md"
        height={200}
        width={300}
      />

      {/* Recipe details */}
      <div className="mt-6 px-4">
        <h1 className="text-3xl font-bold text-gray-800">{recipe?.title}</h1>

        {/* Like count */}
        <div className="mt-4 flex items-center gap-4">
          <span className="text-gray-600 font-medium">
            ❤️ {recipe?.rating} Likes
          </span>
        </div>

        {/* Ingredients */}
        <div className="mt-6">
          <h2 className="text-xl font-semibold text-gray-800">Ingredients</h2>
          <ul className="mt-2 list-disc pl-6 text-gray-700">
            {recipe?.ingredients?.map((ingredient, index) => (
              <li key={index}>{ingredient}</li>
            ))}
          </ul>
        </div>

        {/* Preparation Time */}
        <div className="mt-6 flex items-center">
          <span className="text-xl font-semibold text-gray-800">
            Preparation Time:
          </span>
          <span className="ml-2 text-gray-700">
            {recipe?.preparationTime} minutes
          </span>
        </div>

        {/* Steps */}
        <div className="mt-6">
          <h2 className="text-xl font-semibold text-gray-800">Steps</h2>
          <p className="mt-2 text-gray-700 text-lg leading-relaxed">
            {recipe?.steps}
          </p>
        </div>

        {/* Horizontal line separator */}
        <hr className="mt-8 border-gray-300" />

        {/* Comment Section */}
        <section className="mt-8">
          <h2 className="text-2xl font-semibold mb-4">Comments</h2>

          {/* Comment Form */}
          <CommentForm onAddComment={addComment} id={id!} />

          {/* List of Comments */}
          <div>
            {comments.length > 0 ? (
              comments?.map((comment, index) => (
                <Comment
                  key={index}
                  name={comment?.user?.name || "NO NAME"}
                  commentText={comment?.comment}
                  timestamp={comment?.createdAt}
                />
              ))
            ) : (
              <p className="text-gray-500">No comments yet.</p>
            )}
          </div>
        </section>
      </div>
    </div>
  );
};

export default RecipeDetail;
