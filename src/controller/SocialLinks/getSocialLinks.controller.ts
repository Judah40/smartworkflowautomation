import { Request, Response } from "express";
import { getSocialsLinks } from "../../service/SocialLinks/getSocialLinks";

export const getSocialsLinksController = async (
  req: Request,
  res: Response
): Promise<void> => {
  if (!req.user?.id) {
    res.status(401).json({ error: "Unauthorized: No user ID found" });
    return;
  }
  try {
    const socialLinks = await getSocialsLinks({ userId: req.user.id });
    res.status(200).json({
      message: "successfully gotten social Links",
      data: socialLinks,
    });
    return;
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    res.status(400).json({ error: errorMessage });
    return;
  }
};
