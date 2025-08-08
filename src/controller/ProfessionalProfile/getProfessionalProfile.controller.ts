import { Request, Response } from "express";
import { getUserProfessionalProfile } from "../../service/Profile/getProfessionalProfile";

export const getProfessionalProfileController = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const id = req.user?.id;
    const professionalProfile = await getUserProfessionalProfile(id || "");
    res.status(200).json({
      message: "successfully gotten profile",
      data: professionalProfile,
    });
    return;
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    res.status(400).json({ error: errorMessage });
    return;
  }
};
