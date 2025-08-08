import { Request, Response } from "express";
import { signInService } from "../../service/Auth/signInService";
import { UserTokenGenerator } from "../../utils/generateToken";

export const signInController = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { email, password } = req.body;

  try {
    const user = await signInService(email, password);

    const token = await UserTokenGenerator({ id: user.id, email: user.email });
    res.status(200).json({
      message: "Sign-in successful",
      user: {
        name: user.name,
        email: user.email,
        token: token,
        isVerified: user.isVerified,
      },
    });

    return;
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    res.status(400).json({ error: errorMessage });
    return;
  }
};
