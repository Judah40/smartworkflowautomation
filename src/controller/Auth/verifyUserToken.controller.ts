import { Request, Response } from "express";
import { verifyVerificationToken } from "../../service/Auth/verifiyUserToken";

export const verifyUserToken = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { token } = req.body;
  try {
    const isTokenValid = await verifyVerificationToken(token);
    if (isTokenValid) {
      res.status(200).json({
        message: "Token is valid",
        isVerified: true,
        status:200
      });
    } else {
      res.status(400).json({
        message: "Invalid token",
        isVerified: false,
        status:400
      });
    }
    return;
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    res.status(400).json({ error: errorMessage, status:400 });
    return;
  }
};
