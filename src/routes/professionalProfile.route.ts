import { Router } from "express";
import { verifyUserToken } from "../controller/Auth/verifyUserToken.controller";
import { createProfessionalProfileController } from "../controller/ProfessionalProfile/createProfile.controller";
import {
  professionalProfileValidation,
  updateProfessionalProfileValidation,
} from "../utils/inputValidations";
import { getProfessionalProfileController } from "../controller/ProfessionalProfile/getProfessionalProfile.controller";
import { updateProfessionalProfileController } from "../controller/ProfessionalProfile/updateProfile.controller";

const router = Router();
//CREATE
router.post(
  "/",
  professionalProfileValidation,
  createProfessionalProfileController
);

//UPDATE
router.patch(
  "/",
  updateProfessionalProfileValidation,
  updateProfessionalProfileController
);

//GET
router.get("/", getProfessionalProfileController);

export const professionalRoute = router;
