////////////////////////////////////////////////////////////////////////////////////////////

import { NextFunction, Request, Response } from "express";
import { jwtTokenSecret } from "../config/default";
import jwt from "jsonwebtoken";


//GET AUTH TOKEN
interface AuthTokenRequest extends Request {
  headers: {
    authorization?: string;
    [key: string]: any;
  };
}

interface AuthTokenResponse extends Response {}

function getAuthToken(req: Request): string | null {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return null;
  }
  return authHeader.split(" ")[1];
}


////////////////////////////////////////////////////////////////////////////////////////////
//VERIFY JWT TOKEN
export const requireAuthenticatedUser = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = getAuthToken(req);

    if (!token) {
      return res
        .status(401)
        .json({ error: "Authorization header missing or incorrect format." });
    }

    const decoded = jwt.verify(token, jwtTokenSecret) as jwt.JwtPayload;

    if (!decoded?.id) {
      return res
        .status(401)
        .json({ message: "Invalid Authentication Token. Please Try Again" });
    }

    // ✅ TypeScript now knows req.user exists
    req.user = { id: decoded.id, email: decoded.email };

    next();
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Authentication Failed";

    if (message === "invalid signature") {
      return res
        .status(401)
        .json({ message: "Invalid Authentication Token. Please Try Again" });
    }
    if (message === "jwt expired") {
      return res
        .status(401)
        .json({ message: "Session Expired. Please Login Again" });
    }

    return res.status(401).json({ message });
  }
};