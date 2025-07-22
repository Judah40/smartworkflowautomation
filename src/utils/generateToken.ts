import jwt from "jsonwebtoken";
// Function to generate a JWT token for user authentication
export const UserTokenGenerator = (data: string) => {
  const Jwt = jwt.sign(data, process.env.JWT_SECRET || "default", {
    expiresIn: "1h",
  });
  return Jwt;
};

// Function to generate a verification token
export const generateToken = (length: number = 32): string => {
  const verificationToken = Math.random().toString(36).substring(2, 15); // Simple token generation, consider using a more secure method
  return verificationToken;
};
