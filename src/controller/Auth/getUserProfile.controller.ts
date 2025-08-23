import { Request, Response } from "express";
import { getUserProfile } from "../../service/Auth/getUserProfile";

export const getUserProfileController = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    if (!req.user?.id) {
      res.status(401).json({ error: "Unauthorized: No user ID found" });
      return;
    }
    const user = await getUserProfile({ id: req.user?.id });
    res.status(200).json({
      status: 200,
      message: "successfully gotten user",
      data: user,
    });
    return;
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    res.status(400).json({ error: errorMessage, status: 400 });
    return;
  }
};
