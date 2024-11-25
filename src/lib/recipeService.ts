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
//   Timestamp,
//   arrayUnion,
//   arrayRemove,
} from "firebase/firestore";
// import cloudinary from "../lib/cloudinary.config";

/**
 * Fetch all recipes from Firestore with optional filters.
 */
export const getAllRecipes = async (
  ingredient?: string,
  time?: number,
  rating?: number
// eslint-disable-next-line @typescript-eslint/no-explicit-any
): Promise<any[]> => {
  try {
    const recipesCollection = collection(db, "recipes");

    let recipesQuery = query(recipesCollection);

    // Filter by ingredient
    if (ingredient) {
      recipesQuery = query(recipesCollection, where("ingredients", "array-contains", ingredient));
    }

    const snapshot = await getDocs(recipesQuery);
    const recipes = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));

    // Apply additional filters locally
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return recipes.filter((recipe: any) => {
      let matches = true;
      if (time && time > 0) matches = matches && recipe.preparationTime <= time;
      if (rating && rating > 0) matches = matches && recipe.averageRating >= rating;
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
export const createRecipe = async (recipeData: any): Promise<any> => {
    console.log('recipe data ', recipeData);
  try {
    const recipesCollection = collection(db, "recipes");
    const newRecipe = { ...recipeData, createdAt: new Date().toISOString(), ratings: [] };
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

    console.log('recipe by id ', snapshot);

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
export const rateRecipe = async (recipeId: string, userId: string, userRating: number): Promise<any> => {
  if (userRating < 1 || userRating > 5) {
    throw new Error("Rating must be between 1 and 5");
  }

  try {
    const docRef = doc(db, "recipes", recipeId);
    const recipeSnapshot = await getDoc(docRef);

    if (!recipeSnapshot.exists()) {
      throw new Error("Recipe not found");
    }

    const recipe = recipeSnapshot.data();
    const existingRatings = recipe.ratings || [];

    // Check if the user has already rated
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const existingRating = existingRatings.find((rating: any) => rating.userId === userId);

    if (existingRating) {
      // Update the existing rating
      existingRating.rating = userRating;
    } else {
      // Add new rating
      existingRatings.push({ userId, rating: userRating });
    }

    // Calculate average rating
    const totalRatings = existingRatings.length;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const sumOfRatings = existingRatings.reduce((sum: number, { rating }: any) => sum + rating, 0);
    const averageRating = parseFloat((sumOfRatings / totalRatings).toFixed(2));

    // Update Firestore
    await updateDoc(docRef, { ratings: existingRatings, averageRating });

    return { recipeId, averageRating, totalRatings, ratings: existingRatings };
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    throw new Error("Error updating rating: " + error.message);
  }
};

/**
 * Upload recipe image to Cloudinary and return the URL.
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
// export const uploadRecipeImage = async (file: any): Promise<string> => {
//   try {
//     const uploadResult = await cloudinary.uploader.upload(file.path, {
//       folder: "recipes",
//       public_id: `Image_${Timestamp.now()}`,
//       transformation: { fetch_format: "auto", quality: "auto" },
//     });

//     return uploadResult.secure_url;
//   // eslint-disable-next-line @typescript-eslint/no-explicit-any
//   } catch (error: any) {
//     throw new Error(`Image upload failed: ${error.message}`);
//   }
// };
