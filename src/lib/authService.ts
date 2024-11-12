import { collection, doc, setDoc, Timestamp } from "firebase/firestore";
import { db } from "./fireStoreConfig";

// Register user function (Firestore only)
export const registerUser = async (userData: {
  name: string;
  email: string;
  password: string;
}) => {
  const { name, email, password } = userData;

  try {
    // Create a new user document with a generated ID
    const usersCollectionRef = collection(db, "users");
    const userDocRef = doc(usersCollectionRef);

   const res =  await setDoc(userDocRef, {
      id: userDocRef.id,
      name,
      email,
      password, // Storing password directly, ideally you should hash this
      createdAt: Timestamp.now(),
      isActive: true,
    });

    console.log('res ', res);

    return { message: "User registered successfully", id: userDocRef.id };
  } catch (error: any) {
    return { error: error.message };
  }
};
