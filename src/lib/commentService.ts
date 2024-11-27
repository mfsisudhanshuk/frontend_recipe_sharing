import { collection, addDoc, where, getDocs, query, doc, getDoc } from "firebase/firestore";
import { db } from "./fireStoreConfig";

/**
 * Create a new comment in Firestore.
 * @param recipeId - ID of the recipe to which the comment is linked.
 * @param commentText - The text of the comment.
 * @param user - The currently logged-in user.
 */
export const createComment = async (
  recipeId: string,
  commentText: string,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  user: any
// eslint-disable-next-line @typescript-eslint/no-explicit-any
): Promise<any> => {
  try {
    if (!recipeId || !commentText || !user) {
      throw new Error("Invalid input. All fields are required.");
    }

    // Fetch the recipe document to get its creator's ID
    const recipeDocRef = doc(db, "recipes", recipeId);
    const recipeDoc = await getDoc(recipeDocRef);

    if (!recipeDoc.exists()) {
      throw new Error("Recipe not found.");
    }

    const recipeData = recipeDoc.data();
    const recipeCreatorId = recipeData?.creatorId;

    // Check if the logged-in user is the creator of the recipe
    if (user.id === recipeCreatorId) {
      throw new Error("You cannot comment on your own recipe.");
    }

    // Check if the user has already commented on this recipe
    const commentsCollection = collection(db, "comments");
    const existingCommentQuery = query(
      commentsCollection,
      where("recipeId", "==", recipeId),
      where("user.id", "==", user.id)
    );

    const existingCommentSnapshot = await getDocs(existingCommentQuery);

    if (!existingCommentSnapshot.empty) {
      throw new Error("You have already commented on this recipe.");
    }


    const newComment = {
      recipeId,
      comment: commentText,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
      createdAt: new Date().toISOString(),
    };

    const docRef = await addDoc(commentsCollection, newComment);
    return { id: docRef.id, ...newComment };
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    throw new Error("Error creating comment: " + error.message);
  }
};


/**
 * Fetch all comments for a given recipe from Firestore.
 * @param recipeId - ID of the recipe.
 */
export const fetchComments = async (recipeId: string) => {
    try {
      if (!recipeId) {
        throw new Error("Recipe ID is required.");
      }
  
      const commentsCollection = collection(db, "comments");
      const q = query(commentsCollection, where("recipeId", "==", recipeId));
      const querySnapshot = await getDocs(q);
  
      const comments = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
  
      return comments;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      throw new Error("Error fetching comments: " + error.message);
    }
  };