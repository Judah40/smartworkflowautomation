////////////////////////////////////////////////////////////////////////////////////////////

import { NextFunction, Request, Response } from "express";
import { jwtTokenSecret } from "../config/default";
import jwt from "jsonwebtoken";

// Extend Express Request interface to include 'user'
declare global {
  namespace Express {
    interface Request {
      user?: {
        id: string;
      };
    }
  }
}
//GET AUTH TOKEN
interface AuthTokenRequest extends Request {
  headers: {
    authorization?: string;
    [key: string]: any;
  };
}

interface AuthTokenResponse extends Response {}

const getAuthToken = (
  req: AuthTokenRequest,
  res: AuthTokenResponse
): string | AuthTokenResponse => {
  try {
    const authHeader = req.headers.authorization || null;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res
        .status(401)
        .json({ error: "Authorization header missing or incorrect format." });
    }

    return authHeader.split(" ")[1];
  } catch (error) {
    console.error("GET AUTH TOKEN ERROR: ", error);
    throw error;
  }
};

////////////////////////////////////////////////////////////////////////////////////////////
//VERIFY JWT TOKEN
const requireAuthenticatedUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = getAuthToken(req, res);

    if (typeof token !== "string") {
      // getAuthToken already sent a response, just return
      return;
    }

    const decodedToken = jwt.verify(token, jwtTokenSecret);

    if (
      !decodedToken ||
      typeof decodedToken === "string" ||
      !(decodedToken as jwt.JwtPayload).id
    ) {
      return res
        .status(401)
        .json({ message: "Invalid Authentication Token. Please Try Again" });
    }
    req.user = {
      id: (decodedToken as jwt.JwtPayload).id,
    };
    return next();
  } catch (error) {
    console.error("REQUIRE AUTHENTICATED USER ERROR: ", error);
    const errorMessage =
      typeof error === "object" && error !== null && "message" in error
        ? (error as { message?: string }).message
        : undefined;

    if (errorMessage === "invalid signature") {
      return res
        .status(401)
        .json({ message: "Invalid Authentication Token. Please Try Again" });
    }
    if (errorMessage === "jwt expired") {
      return res
        .status(401)
        .json({ message: "Session Expired Please Login to Continue" });
    }
    return res
      .status(401)
      .json({ message: "Authentication Failed. Please Try Again!" });
  }
};

export default requireAuthenticatedUser;
