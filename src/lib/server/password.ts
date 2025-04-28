import bcrypt from "bcrypt";

/**
 * Verifies if the provided password matches the hashed password.
 * @param hash - The hashed password stored in the database.
 * @param password - The plain-text password provided by the user.
 * @returns A boolean indicating whether the password is valid.
 */
// This is a function for when the password is hashed
// export async function verifyPasswordHash(hash: string, password: string): Promise<boolean> {
//   return await bcrypt.compare(password, hash);
// }

//right now the passwords are not hashed so using plain-text comparison
export async function verifyPasswordHash(storedPassword: string, providedPassword: string): Promise<boolean> {
    return storedPassword === providedPassword;
  }