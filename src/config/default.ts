import dotenv from "dotenv";

dotenv.config();
export const jwtTokenSecret = process.env.JWT_SECRET || "defaultSecret";
export const port = process.env.PORT 
