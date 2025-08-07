import jwt from "jsonwebtoken";
import { jwtTokenSecret } from "../config/default";
// Function to generate a JWT token for user authentication
export const UserTokenGenerator = (data: string) => {
  const Jwt = jwt.sign({ data }, jwtTokenSecret || "default", {
    expiresIn: "1h", // Token expiration time
  });
  return Jwt;
};

// Function to generate a verification token
export const generateToken = (length: number = 32): string => {
  const verificationToken = Math.random().toString(36).substring(2, 15); // Simple token generation, consider using a more secure method
  return verificationToken;
};
