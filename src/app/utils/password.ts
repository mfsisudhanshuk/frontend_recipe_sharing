import bcrypt from "bcryptjs";

/**
 * Hash a plain text password
 * @param password - The plain text password
 * @returns A hashed password
 */
export const hashPassword = async (password: string): Promise<string> => {
  const salt = await bcrypt.genSalt(10); // Generate a salt
  return bcrypt.hash(password, salt); // Hash the password
};

/**
 * Compare a plain text password with a hashed password
 * @param password - The plain text password
 * @param hashedPassword - The hashed password
 * @returns Boolean indicating if passwords match
 */
export const comparePassword = async (
  password: string,
  hashedPassword: string
): Promise<boolean> => {
  return bcrypt.compare(password, hashedPassword);
};
