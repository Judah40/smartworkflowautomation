import { Router } from "express";
import { registerUsersController } from "../controller/Auth/register.controller";
import { signInController } from "../controller/Auth/signin.controller";
import {
  checkIfUserExistController,
  resetPasswordController,
} from "../controller/Auth/forgetPassword.controller";
import {
  forgetPasswordValidation,
  updatePasswordValidation,
  userRegistrationValidation,
  userSignInValidation,
  resetPasswordValidation,
} from "../utils/inputValidations";

const router = Router();

router.post("/register", userRegistrationValidation, registerUsersController);

router.post("/signin", userSignInValidation, signInController);

router.post(
  "/forget-password",
  forgetPasswordValidation,
  checkIfUserExistController
);

router.patch(
  "/reset-password",
  resetPasswordValidation,
  resetPasswordController
);

export const authRoutes = router;
