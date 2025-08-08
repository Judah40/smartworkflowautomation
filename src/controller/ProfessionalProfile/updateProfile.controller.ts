import { Request, Response } from "express";
import { updateUserProfessionalProfile } from "../../service/Profile/updateUserProfessionalProfile";

export const updateProfessionalProfileController = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { bio, company, companyLocation, position, portfolioUrl } = req.body;
  const id = req.user?.id;
  console.log(bio)
  try {
    await updateUserProfessionalProfile({
      bio,
      company,
      companyLocation,
      position,
      userId: id || "",
      portfolioUrl,
    });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    res.status(400).json({ error: errorMessage });
    return;
  }
};
