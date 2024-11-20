import {
  collection,
  doc,
  setDoc,
  Timestamp,
  query,
  where,
  getDocs,
} from "firebase/firestore";
import { db } from "./fireStoreConfig";

import CryptoJS from "crypto-js";

import * as Yup from "yup";

// Validation Schema
const userSchema = Yup.object().shape({
  name: Yup.string()
    .required("Name is required")
    .min(3, "Name must be at least 3 characters"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string()
    .required("Password is required")
    .min(6, "Password must be at least 6 characters"),
});

const validateUserInput = async (userData: unknown) => {
  try {
    await userSchema.validate(userData);
    return { isValid: true };
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    return { isValid: false, message: error.message };
  }
};

// Hash the password using email as the salt
const hashPassword = (password: string, email: string): string => {
  return CryptoJS.SHA256(password + email).toString();
};

export const registerUser = async (userData: {
  name: string;
  email: string;
  password: string;
}) => {
  const { name, email, password } = userData;

  // Validate input
  const validation = await validateUserInput(userData);
  if (!validation.isValid) {
    return { error: validation.message };
  }

  try {
    // Check if email already exists
    const usersCollectionRef = collection(db, "users");
    const emailQuery = query(usersCollectionRef, where("email", "==", email));
    const querySnapshot = await getDocs(emailQuery);

    if (!querySnapshot.empty) {
      return { error: "Email already exists. Please use a different email." };
    }

    // Create a new user document with a generated ID
    const userDocRef = doc(usersCollectionRef);

    // Generate a salt and hash the password
    const hashedPassword = hashPassword(email, password);

    await setDoc(userDocRef, {
      id: userDocRef.id,
      name,
      email,
      password: hashedPassword,
      createdAt: Timestamp.now(),
    });

    return { message: "User registered successfully", id: userDocRef.id };

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    return { error: error.message };
  }
};

export const loginUser = async (userData: {
  email: string;
  password: string;
}) => {
  const { email, password } = userData;
  console.log("password ", password);

  try {
    // Query Firestore for the user with the given email
    const usersCollectionRef = collection(db, "users");
    const emailQuery = query(usersCollectionRef, where("email", "==", email));
    const querySnapshot = await getDocs(emailQuery);

    if (querySnapshot.empty) {
      return { error: "User with this email does not exist." };
    }

    // Extract the user data
    let user: {id:string, name?: string, email?: string, password?: string}= {
      id: "",
    };
    querySnapshot.forEach((doc) => {
      user = { id: doc.id, ...doc.data() };
    });

    console.log("user ", user);
    if (!user) {
      return { error: "User not found." };
    }

    // Hash the provided password with the user's email
    const hashedPassword = hashPassword(password, email);
    

    // Compare the hashed passwords
    if (hashedPassword !== user.password) {
      return { error: "Invalid password." };
    }
    // Successful login
    return {
      message: "Login successful",
    };

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    return { error: error.message };
  }
};
