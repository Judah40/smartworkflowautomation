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
} from "../utils/validations/inputValidations";
import { verifyUserToken } from "../controller/Auth/verifyUserToken.controller";
import {
  deleteProfilePictureController,
  getProfilePictureController,
  updateProfilePictureController,
  uploadProfilePictureController,
} from "../controller/Auth/ProfilePicture.controller";
import { requireAuthenticatedUser } from "../middleware/authMiddleware";
import { multerMidleware } from "../middleware/multerConfig";
import { getUserProfileController } from "../controller/Auth/getUserProfile.controller";
import passport from "passport";
import { frontEndUrl } from "../config/default";
import { UserTokenGenerator } from "../utils/generateToken";

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
//get user profile
router.get("/user-profile", requireAuthenticatedUser, getUserProfileController);
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

//google authentication
// Google OAuth

// Step 1: Redirect user to Google
router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

// Step 2: Google callback
router.get(
  "/google/callback",
  passport.authenticate("google", {
    failureRedirect: `${frontEndUrl}/Auth/Login`,
    session: false, // if using sessions; set false if you’ll issue JWTs instead
  }),
  async (req, res) => {
    // At this point, req.user is populated
    if (req.user && req.user.id && req.user.email) {
      const token = await UserTokenGenerator(req.user);
      const payload = JSON.stringify({ user: req.user, token });
      return res.send(`
  <script>
    window.opener.postMessage(${payload}, "http://localhost:3001");
    window.close();
  </script>
`);
    }
    return res.status(400).json({ error: "Authentication failed" });
  }
);

// GitHub OAuth
// Step 1: Redirect user to GitHub
router.get(
  "/github",
  passport.authenticate("github", { scope: ["user:email"] })
);

// Step 2: GitHub callback
router.get(
  "/github/callback",
  passport.authenticate("github", {
    failureRedirect: `${frontEndUrl}/Auth/Login`,
    session: false, // if using sessions; set false if you’ll issue JWTs instead
  }),
  async (req, res) => {
    // At this point, req.user is populated
    if (req.user && req.user.id && req.user.email) {
      const token = await UserTokenGenerator(req.user);
      const payload = JSON.stringify({ user: req.user, token });
      return res.send(`
  <script>
    window.opener.postMessage(${payload}, "http://localhost:3001");
    window.close();
  </script>
`);
    }
    return res.status(400).json({ error: "Authentication failed" });
  }
);
export const authRoutes = router;
