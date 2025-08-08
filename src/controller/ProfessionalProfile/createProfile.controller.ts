import { Request, Response } from "express";
import { setupProfessionalProfile } from "../../service/Profile/createNewProfessionalProfile";

export const createProfessionalProfileController = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { bio, company, companyLocation, position, portfolioUrl } = req.body;

    const id = req.user?.id;
    await setupProfessionalProfile({
      bio,
      company,
      companyLocation,
      position,
      userId: id || "",
      portfolioUrl,
    });
    res.status(200).json({
      message: "successfully setup profile",
    });
    return;
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    res.status(400).json({ error: errorMessage });
    return;
  }
};
