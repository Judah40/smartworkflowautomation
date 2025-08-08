import { Request, Response } from "express";
import { updateUserProfessionalProfile } from "../../service/Profile/updateUserProfessionalProfile";

export const updateProfessionalProfileController = async (
  req: Request,
  res: Response
): Promise<void> => {
  console.log("Controller started");
  const { bio, company, companyLocation, position, portfolioUrl } = req.body;
  const id = req.user?.id;
  try {
    console.log("Calling service...");
    const updateProfile = await updateUserProfessionalProfile({
      bio,
      company,
      companyLocation,
      position,
      userId: id || "",
      portfolioUrl,
    });
    console.log("Service completed");

    res.status(201).json({
      message: "succesfully updated profile",
      data: updateProfile,
    });
  } catch (error) {
    console.error("Error in controller", error);
    const errorMessage = error instanceof Error ? error.message : String(error);
    res.status(400).json({ error: errorMessage });
  }
};
