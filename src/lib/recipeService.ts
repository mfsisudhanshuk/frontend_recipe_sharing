import { db } from "../lib/fireStoreConfig"; // Import Firebase configuration
import {
  collection,
  addDoc,
  getDocs,
  query,
  where,
  getDoc,
  doc,
  updateDoc,
} from "firebase/firestore";
interface Rating {
  userId: string;
  rating: number;
}

interface Recipe {
  ratings?: Rating[];
  averageRating: number;
}

/**
 * Fetch all recipes from Firestore with optional filters.
 * @param ingredient - Filter by a specific ingredient.
 * @param time - Filter recipes with preparation time less than or equal to the provided value.
 * @param rating - Filter recipes with average rating greater than or equal to the provided value.
 * @returns Array of filtered recipes.
 */
export const getAllRecipes = async (
  ingredient?: string,
  time?: number,
  rating?: number
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
): Promise<any[]> => {
  try {
    const recipesCollection = collection(db, "recipes");

    // Firestore query builder
    let recipesQuery = query(recipesCollection);

    // Filter by ingredient
    if (ingredient) {
      recipesQuery = query(
        recipesQuery,
        where("ingredients", "array-contains", ingredient)
      );
    }

    // Fetch recipes
    const snapshot = await getDocs(recipesQuery);
    const recipes = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    // Apply additional filters locally for unsupported Firestore operations
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return recipes.filter((recipe: any) => {
      let matches = true;

      // Filter by preparation time (less than or equal to)
      if (time && time > 0) {
        matches = matches && recipe.preparationTime <= time;
      }

      // Filter by rating (greater than or equal to)
      if (rating && rating > 0) {
        matches = matches && recipe.averageRating >= rating;
      }

      return matches;
    });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    throw new Error("Error fetching recipes: " + error.message);
  }
};

/**
 * Create a new recipe in Firestore.
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const createRecipe = async (
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  recipeData: any,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  user: any
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
): Promise<any> => {
  try {
    const recipesCollection = collection(db, "recipes");
    const newRecipe = {
      ...recipeData,
      createdBy: user?.id,
      createdAt: new Date().toISOString(),
      ratings: [],
    };
    const docRef = await addDoc(recipesCollection, newRecipe);
    return { id: docRef.id, ...newRecipe };
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    throw new Error("Error creating recipe: " + error.message);
  }
};

/**
 * Fetch a single recipe by its ID from Firestore.
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const getSingleRecipe = async (id: string): Promise<any> => {
  try {
    const docRef = doc(db, "recipes", id);
    const snapshot = await getDoc(docRef);

    if (!snapshot.exists()) {
      throw new Error("Recipe not found");
    }

    return { id: snapshot.id, ...snapshot.data() };
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    throw new Error("Error fetching recipe: " + error.message);
  }
};

/**
 * Rate a recipe or update the user's existing rating in Firestore.
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const rateRecipe = async (
  recipeId: string,
  userId: string,
  userRating: number
): Promise<{
  recipeId: string;
  averageRating: number;
  totalRatings: number;
  ratings: Rating[];
}> => {
  if (userRating < 1 || userRating > 5) {
    throw new Error("Rating must be between 1 and 5");
  }

  try {
    const docRef = doc(db, "recipes", recipeId);
    const recipeSnapshot = await getDoc(docRef);

    if (!recipeSnapshot.exists()) {
      throw new Error("Recipe not found");
    }

    const recipe = recipeSnapshot.data() as Recipe;
    const existingRatings = recipe.ratings || [];

    // Check for an existing rating
    const existingRating = existingRatings.find((r) => r.userId === userId);

    if (existingRating) {
      existingRating.rating = userRating;
    } else {
      existingRatings.push({ userId, rating: userRating });
    }

    // Calculate average rating
    const totalRatings = existingRatings.length;
    const sumOfRatings = existingRatings.reduce((sum, r) => sum + r.rating, 0);
    const averageRating = parseFloat((sumOfRatings / totalRatings).toFixed(2));

    // Update Firestore
    await updateDoc(docRef, { ratings: existingRatings, averageRating });

    return { recipeId, averageRating, totalRatings, ratings: existingRatings };
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    throw new Error(`Error updating rating: ${error.message}`);
  }
};
/**
 * Upload recipe image to Cloudinary and return the URL.
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const uploadRecipeImage = async (file: File): Promise<string> => {
  const formData = new FormData();
  formData.append("image", file);
  const response = await fetch("/api/upload", {
    method: "POST",
    body: formData,
  });
  if (!response.ok) {
    throw new Error("Failed to upload image");
  }

  const data = await response.json();
  return data.url;
};
