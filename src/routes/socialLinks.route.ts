import { Router } from "express";
import { setupSocialLinksValidation } from "../utils/inputValidations";
import { setupSocialLinksController } from "../controller/SocialLinks/setupSocialLinks.controller";
import { getSocialsLinksController } from "../controller/SocialLinks/getSocialLinks.controller";

const router = Router();
//setup social links

router.post("/", setupSocialLinksValidation, setupSocialLinksController);
//get all links
router.get("/", getSocialsLinksController);
export const socialRoute = router;
