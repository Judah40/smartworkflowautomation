import { Request, Response } from "express";
import { addSocialLinksService } from "../../service/SocialLinks/addSocialLinks";

export const setupSocialLinksController = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { linkedIn, facebook, instagram, github, X, youtube, website } =
    req.body;
  if (!req.user?.id) {
    res
      .status(401)
      .json({ error: "Unauthorized: No user ID found", status: 401 });
    return;
  }
  try {
    const setupSocialLinks = await addSocialLinksService({
      userId: req.user.id,
      linkedIn,
      facebook,
      instagram,
      github,
      X,
      youtube,
      website,
    });
    res.status(200).json({
      message: "successfully added social link",
      data: setupSocialLinks,
      status: 200,
    });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    res.status(400).json({ error: errorMessage, status: 400 });
    return;
  }
};
