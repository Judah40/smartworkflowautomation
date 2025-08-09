import { Request, Response } from "express";
import { uploadProfilePictureService } from "../../service/Auth/ProfilePicture/uploadProfilePicture";
import { updateProfilePictureService } from "../../service/Auth/ProfilePicture/updateProfilePicture";
import { deleteProfilePictureService } from "../../service/Auth/ProfilePicture/deleteProfilePicture";
import { getProfilePictureService } from "../../service/Auth/ProfilePicture/getProfilePicture";

export const uploadProfilePictureController = async (
  req: Request,
  res: Response
): Promise<void> => {
  const file = req.file as Express.Multer.File | undefined;

  try {
    if (!file) {
      res.status(400).json({ error: "No file uploaded" });
      return;
    }
    if (!req.user?.id) {
      res.status(401).json({ error: "Unauthorized: No user ID found" });
      return;
    }

    const uploadImage = await uploadProfilePictureService({
      file: file.buffer,
      mimieType: file.mimetype,
      userId: req.user.id,
    });

    if (!uploadImage.path) {
      res.send({
        message: "failed to upload picture",
      });
      return;
    }

    res.status(200).json({
      message: "successfully uploaded profile picture",
    });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    res.status(400).json({ error: errorMessage });
    return
  }
};

export const updateProfilePictureController = async (
  req: Request,
  res: Response
): Promise<void> => {
  const file = req.file as Express.Multer.File | undefined;

  try {
    if (!file) {
      res.status(400).json({ error: "No file uploaded" });
      return;
    }
    if (!req.user?.id) {
      res.status(401).json({ error: "Unauthorized: No user ID found" });
      return;
    }

    const updateImage = await updateProfilePictureService({
      file: file.buffer,
      mimieType: file.mimetype,
      userId: req.user.id,
    });

    if (!updateImage.path) {
      res.send({
        message: "failed to update picture",
      });
      return;
    }

    res.status(200).json({
      message: "successfully updated profile picture",
    });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    res.status(400).json({ error: errorMessage });
    return
  }
};

export const deleteProfilePictureController = async (
  req: Request,
  res: Response
): Promise<void> => {
  if (!req.user?.id) {
    res.status(401).json({ error: "Unauthorized: No user ID found" });
    return;
  }

  try {
    const deleteImage = await deleteProfilePictureService({
      userId: req.user?.id,
    });
    if (!deleteImage) {
      res.send({
        message: "could not delete profile picture",
      });
    }

    res.status(200).json({
      message: "successfully deleted profile picture",
    });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    res.status(400).json({ error: errorMessage });
    return
  }
};

export const getProfilePictureController = async (
  req: Request,
  res: Response
): Promise<void> => {
  if (!req.user?.id) {
    res.status(401).json({ error: "Unauthorized: No user ID found" });
    return;
  }

  try {
    const profilePictureUrl = await getProfilePictureService({
      userId: req.user?.id,
    });
    if (!profilePictureUrl) {
      res.status(404).json({
        mesage: "no profile picture",
      });
      return;
    }

    res.status(200).json({
      message: "successfully gotten profile picture",
      data: profilePictureUrl,
    });
    return;
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    res.status(400).json({ error: errorMessage });
    return;
  }
};
