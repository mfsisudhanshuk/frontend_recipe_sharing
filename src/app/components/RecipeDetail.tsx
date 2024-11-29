'use client';

import { useEffect, useState } from "react";
import { CommentForm } from "./CommentRecipe";
import { Comment } from "./Comment";
import { Loader } from "./common/Loader";
import Image from "next/image";
import { usePathname } from 'next/navigation';
import { getSingleRecipe } from "../../lib/recipeService";
import { useAuth } from "../context/authContext";
import { createComment, fetchComments } from "@/lib/commentService";
import { Toast } from "./common/Toast";

interface User {
  email: string;
  name: string;
  id: string;
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
  averageRating: string;
}

export const RecipeDetail = () => {
  const pathname = usePathname();
  const { user } = useAuth();
 

  // Extract the recipe ID from the URL
  const recipeId = pathname?.split('/').pop();
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [comments, setComments] = useState<CommentType[]>([]);

  useEffect(() => {
    if (!recipeId) {
      setError("Recipe ID not found in the URL.");
      setLoading(false);
      return;
    }

    const fetchRecipeDetails = async () => {
      try {
        setLoading(true);

        // Fetch recipe details
        const fetchedRecipe = await getSingleRecipe(recipeId);
        setRecipe(fetchedRecipe);

        // Fetch comments for the recipe
        const fetchedComments = await fetchComments(recipeId);

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        setComments(fetchedComments as any[]);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (err: any) {
        setError(err.message || "Failed to fetch recipe details.");
      } finally {
        setLoading(false);
      }
    };

    fetchRecipeDetails();
  }, [recipeId]);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const addComment = async (recipeId: string, text: string, user: any) => {
    if (!recipeId || !user) {
      setError("Unable to add comment. User or recipe ID not found.");
      return;
    }
  
    try {
      setLoading(true);
  
      // Call the createComment service
      const newComment = await createComment(recipeId, text, user);

      // Update comments in local state
      setComments((prevComments) => [newComment, ...prevComments]);
      setSuccessMessage("Comment submitted successfully!");
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      setError(err.message || "Failed to add comment.");
    } finally {
      setLoading(false);
    }
  };
  

  if (loading) return <Loader />;
  // if (error) return <ErrorMessage message={error} />;

  return (
    <>{error && (
      <Toast message={error} type="error" onClose={() => setError(null)} />
    )}
    {successMessage && (
      <Toast
        message={successMessage}
        type="success"
        onClose={() => setSuccessMessage(null)}
      />
    )}
    
    
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
            ❤️ {recipe?.averageRating} Likes
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
         {user && <CommentForm onAddComment={addComment} recipeId={recipeId!} user={user}/>}

          {/* List of Comments */}
          <div>
            {comments.length > 0 ? (
              comments.map((comment, index) => (
                <Comment
                  key={index}
                  name={comment.user.name || "NO NAME"}
                  commentText={comment.comment}
                  timestamp={comment.createdAt}
                />
              ))
            ) : (
              <p className="text-gray-500">No comments yet.</p>
            )}
          </div>
        </section>
      </div>
    </div>
    </>
  );
};

export default RecipeDetail;
