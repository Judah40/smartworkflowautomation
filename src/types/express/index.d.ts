import { Request } from "express";
import "express";

// Define the shape of your user object
interface UserPayload {
  id: string; // Or whatever type your user ID is
  email: string;
}

// Extend the Express Request interface
declare module "express" {
  export interface Request {
    user?: UserPayload; // Use `?` if the property is optional
  }
}


declare module "express-serve-static-core" {
  interface Request {
    user?: {
      id: string;
      email: string;
    };
  }
}