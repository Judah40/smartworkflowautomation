import { Request, Response } from "express";
import {
  checkUserExists,
  resetPassword,
} from "../../service/Auth/forgotPassword";

// Controller to handle checking if a user exists by email
export const checkIfUserExistController = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { email } = req.body;

  try {
    const userExist = await checkUserExists(email);

    res.status(200).json({
      message: "If the email exists, a reset link has been sent.",
      // result: result, // Uncomment when the service is implemented
      verificationToken: userExist.verificationToken,
    });
    return;
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    res.status(400).json({ error: errorMessage });
    return;
  }
};

// Controller to handle password reset
export const resetPasswordController = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { verificationToken, password } = req.body;

  try {
    const updatedUser = await resetPassword(verificationToken, password);

    res.status(200).json({
      message: "Password reset successful",
      isVerified: updatedUser.isVerified,
    });
    return;
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    res.status(400).json({ error: errorMessage });
    return;
  }
};
