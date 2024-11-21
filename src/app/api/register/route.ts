// TODO: Think later to create api

import { NextApiRequest, NextApiResponse } from "next";
import { hashPassword } from "../../utils/password"; // Adjust path as necessary
import { db } from "../../../lib/fireStoreConfig"; // Firestore setup
import { collection, doc, setDoc } from "firebase/firestore";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { name, email, password } = req.body;

  try {
    // Hash the password
    const hashedPassword = await hashPassword(password);

    // Store in Firestore
    const usersCollectionRef = collection(db, "users");
    const userDocRef = doc(usersCollectionRef);
    await setDoc(userDocRef, {
      id: userDocRef.id,
      name,
      email,
      password: hashedPassword,
      createdAt: new Date().toISOString(),
    });

    return res.status(201).json({ message: "User registered successfully" });
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    return res.status(500).json({ error: "Failed to register user" });
  }
}
