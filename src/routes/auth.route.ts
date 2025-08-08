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
  verificationTokenValidation,
} from "../utils/inputValidations";
import { verifyUserToken } from "../controller/Auth/verifyUserToken.controller";
import {
  deleteProfilePictureController,
  getProfilePictureController,
  updateProfilePictureController,
  uploadProfilePictureController,
} from "../controller/Auth/ProfilePicture.controller";
import { requireAuthenticatedUser } from "../middleware/authMiddleware";
import { multerMidleware } from "../middleware/multerConfig";

const router = Router();

//register new user
router.post("/register", userRegistrationValidation, registerUsersController);

//sign in user
router.post("/signin", userSignInValidation, signInController);

//forget password controller
router.post(
  "/forget-password",
  forgetPasswordValidation,
  checkIfUserExistController
);

//reset password controller
router.patch(
  "/reset-password",
  resetPasswordValidation,
  resetPasswordController
);

//verify token
router.post("/verifyToken", verificationTokenValidation, verifyUserToken);

//upload profile picture controller
router.post(
  "/upload-pic",
  multerMidleware.single("file"),
  requireAuthenticatedUser,
  uploadProfilePictureController
);

//get profile picture controller
router.get("/get-pic", requireAuthenticatedUser, getProfilePictureController);
//update profile picture controller
router.patch(
  "/update-pic",
  multerMidleware.single("file"),
  requireAuthenticatedUser,
  updateProfilePictureController
);

//delete profile picture controller
router.delete(
  "/delete-pic",
  multerMidleware.single("file"),
  requireAuthenticatedUser,
  deleteProfilePictureController
);
export const authRoutes = router;
