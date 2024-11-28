import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "./fireStoreConfig";
import { collection, doc, setDoc, Timestamp } from "firebase/firestore";
import { db } from "./fireStoreConfig";
import * as Yup from "yup";
import { hashPassword } from "@/app/utils/password";

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
    // Create user with Firebase Authentication
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    // Update user profile with name
    await updateProfile(user, { displayName: name });

    // Create a new user document in Firestore
    const userDocRef = doc(collection(db, "users"), user.uid);
    const hashedPassword = await hashPassword(password);

    await setDoc(userDocRef, {
      id: user.uid,
      name,
      email,
      password: hashedPassword,
      createdAt: Timestamp.now(),
    });

    return { message: "User registered successfully", id: user.uid };
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

  try {
    // Sign in user with Firebase Authentication
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    const token = await user.getIdToken();
    document.cookie = `token=${token}; path=/; max-age=${60 * 60 * 24 * 7}; SameSite=Strict; Secure`; // 1 week expiry

    return {
      message: "Login successful",
      user: {
        id: user.uid,
        email: user.email,
        name: user.displayName,
      },
    };
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    return { error: error.message };
  }
};
