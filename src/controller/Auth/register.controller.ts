import { Request, Response } from "express";
import { registerUsersService } from "../../service/Auth/registerUsers";

export const registerUsersController = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { name, email, password } = req.body;

  try {
    // Here you would typically call a service to handle the registration logic
    // For example: await registerUserService(name, email, password);

    // Assuming registerUsersService is a function that handles user registration
    const registeredUser = await registerUsersService(email, password, name);

    res.status(201).json({
      message: "User registered successfully",
      user: registeredUser,
    });
    return;
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    res.status(400).json({ error: errorMessage });
    return;
  }
};
