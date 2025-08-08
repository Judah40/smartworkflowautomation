import { Request, Response } from "express";
import { setupProfessionalProfile } from "../../service/Profile/createNewProfessionalProfile";

export const createProfessionalProfileController = async (
  req: Request,
  res: Response
): Promise<void> => {
  console.log(req.body);
//   if (!req.body || Object.keys(req.body).length === 0) {
//     res.status(400).json({ error: "Request body is missing" });
//     return;
//   }
  const { bio, company, companyLocation, position, portfolioUrl } =
    req.body||{} ;

  // ✅ Ensure the auth middleware attached req.user
  if (!req.user?.id) {
    res.status(401).json({ error: "Unauthorized: No user ID found" });
    return;
  }

  try {
    await setupProfessionalProfile({
      bio,
      company,
      companyLocation,
      position,
      userId: req.user.id, // No fallback empty string
      portfolioUrl,
    });

    res.status(201).json({
      message: "Successfully setup profile",
    });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    res.status(400).json({ error: errorMessage });
  }
};
