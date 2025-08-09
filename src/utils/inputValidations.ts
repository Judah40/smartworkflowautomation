import * as yup from "yup";

//schema for user signin validation
export const userSignInSchema = yup.object().shape({
  email: yup
    .string()
    .email("Invalid email format")
    .required("Email is required"),
  password: yup
    .string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});

//schema for forget password validation
export const forgetPasswordSchema = yup.object().shape({
  email: yup
    .string()
    .email("Invalid email format")
    .required("Email is required"),
});

//schema for user registration validation
export const userRegistrationSchema = yup.object().shape({
  name: yup.string().required("Name is required"),
  email: yup
    .string()
    .email("Invalid email format")
    .required("Email is required"),
  password: yup
    .string()
    .min(6, "Password must be at least 6 characters")
    .max(20, "Password must be at most 20 characters")
    .required("Password is required"),
});

//schema for password update validation
export const updatePasswordSchema = yup.object().shape({
  email: yup
    .string()
    .email("Invalid email format")
    .required("Email is required"),
  oldPassword: yup
    .string()
    .min(6, "Old password must be at least 6 characters")
    .required("Old password is required"),
  newPassword: yup
    .string()
    .min(6, "New password must be at least 6 characters")
    .required("New password is required"),
});

//schema for verification token validation
const VerificationTokenSchema = yup.object().shape({
  token: yup
    .string()
    .required("token is required")
    .length(11, "Code must be exactly 11 characters")
    .matches(/^[a-zA-Z0-9]+$/, "Code must be alphanumeric only"),
});
//change password validation schema
export const resetPasswordSchema = yup.object().shape({
  password: yup
    .string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
  verificationToken: yup.string().required("Verification token is required"),
});

//create professional profile schema
export const professionalProfileSchema = yup.object().shape({
  bio: yup
    .string()
    .min(10, "Bio must be at least 10 characters long")
    .max(500, "Bio cannot exceed 500 characters")
    .required("Bio is a required field"),

  company: yup
    .string()
    .min(2, "Company name must be at least 2 characters long")
    .max(100, "Company name cannot exceed 100 characters")
    .required("Company is a required field"),

  companyLocation: yup
    .string()
    .min(2, "Company location must be at least 2 characters long")
    .max(100, "Company location cannot exceed 100 characters")
    .required("Company location is a required field"),

  position: yup
    .string()
    .min(2, "Position must be at least 2 characters long")
    .max(100, "Position cannot exceed 100 characters")
    .required("Position is a required field"),

  portfolioUrl: yup
    .string()
    .url("Portfolio URL must be a valid URL")
    .max(255, "URL cannot exceed 255 characters")
    .notRequired(), // The portfolio URL is an optional field
});

//update professional profile
export const updateProfessionalProfileSchema = yup.object().shape({
  bio: yup
    .string()
    .min(10, "Bio must be at least 10 characters long")
    .max(500, "Bio cannot exceed 500 characters")
    .notRequired(), // Field is optional for updates

  company: yup
    .string()
    .min(2, "Company name must be at least 2 characters long")
    .max(100, "Company name cannot exceed 100 characters")
    .notRequired(), // Field is optional for updates

  companyLocation: yup
    .string()
    .min(2, "Company location must be at least 2 characters long")
    .max(100, "Company location cannot exceed 100 characters")
    .notRequired(), // Field is optional for updates

  position: yup
    .string()
    .min(2, "Position must be at least 2 characters long")
    .max(100, "Position cannot exceed 100 characters")
    .notRequired(), // Field is optional for updates

  portfolioUrl: yup
    .string()
    .url("Portfolio URL must be a valid URL")
    .max(255, "URL cannot exceed 255 characters")
    .notRequired(), // Field is optional for updates
});

//social links validation schema
export const socialLinksSchema = yup.object().shape({
  linkedIn: yup
    .string()
    .url("LinkedIn must be a valid URL")
    .nullable()
    .optional(),
  facebook: yup
    .string()
    .url("Facebook must be a valid URL")
    .nullable()
    .optional(),
  instagram: yup
    .string()
    .url("Instagram must be a valid URL")
    .nullable()
    .optional(),
  github: yup.string().url("GitHub must be a valid URL").nullable().optional(),
  X: yup.string().url("X (Twitter) must be a valid URL").nullable().optional(),
  youtube: yup
    .string()
    .url("YouTube must be a valid URL")
    .nullable()
    .optional(),
  website: yup
    .string()
    .url("Website must be a valid URL")
    .nullable()
    .optional(),
});
//validations
import { Request, Response, NextFunction } from "express";

export const userSignInValidation = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  userSignInSchema
    .validate(req.body, { abortEarly: false })
    .then(() => next())
    .catch((err) => {
      const errorResponse = {
        message: "Validation failed",
        errors: err.inner.map((e: { path?: string; message: string }) => ({
          field: e.path,
          message: e.message,
        })),
      };

      return res.status(400).json(errorResponse);
    });
};

export const userRegistrationValidation = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  userRegistrationSchema
    .validate(req.body, { abortEarly: false })
    .then(() => next())
    .catch((err) => {
      const errorResponse = {
        message: "Validation failed",
        errors: err.inner.map((e: { path?: string; message: string }) => ({
          field: e.path,
          message: e.message,
        })),
      };

      return res.status(400).json(errorResponse);
    });
};

export const updatePasswordValidation = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  updatePasswordSchema
    .validate(req.body, { abortEarly: false })
    .then(() => next())
    .catch((err) => {
      const errorResponse = {
        message: "Validation failed",
        errors: err.inner.map((e: { path?: string; message: string }) => ({
          field: e.path,
          message: e.message,
        })),
      };

      return res.status(400).json(errorResponse);
    });
};

export const resetPasswordValidation = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  resetPasswordSchema
    .validate(req.body, { abortEarly: false })
    .then(() => next())
    .catch((err) => {
      const errorResponse = {
        message: "Validation failed",
        errors: err.inner.map((e: { path?: string; message: string }) => ({
          field: e.path,
          message: e.message,
        })),
      };

      return res.status(400).json(errorResponse);
    });
};

export const forgetPasswordValidation = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  forgetPasswordSchema
    .validate(req.body, { abortEarly: false })
    .then(() => next())
    .catch((err) => {
      const errorResponse = {
        message: "Validation failed",
        errors: err.inner.map((e: { path?: string; message: string }) => ({
          field: e.path,
          message: e.message,
        })),
      };

      return res.status(400).json(errorResponse);
    });
};
export const verificationTokenValidation = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  VerificationTokenSchema.validate(req.body, { abortEarly: false })
    .then(() => next())
    .catch((err) => {
      const errorResponse = {
        message: "Validation failed",
        errors: err.inner.map((e: { path?: string; message: string }) => ({
          field: e.path,
          message: e.message,
        })),
      };

      return res.status(400).json(errorResponse);
    });
};

export const professionalProfileValidation = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  professionalProfileSchema
    .validate(req.body, { abortEarly: false })
    .then(() => next())
    .catch((err) => {
      const errorResponse = {
        message: "Validation failed",
        errors: err.inner.map((e: { path?: string; message: string }) => ({
          field: e.path,
          message: e.message,
        })),
      };

      return res.status(400).json(errorResponse);
    });
};
export const updateProfessionalProfileValidation = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  updateProfessionalProfileSchema
    .validate(req.body || {}, { abortEarly: false })
    .then(() => next())
    .catch((err) => {
      const errorResponse = {
        message: "Validation failed",
        errors: err.inner.map((e: { path?: string; message: string }) => ({
          field: e.path,
          message: e.message,
        })),
      };

      return res.status(400).json(errorResponse);
    });
};
export const setupSocialLinksValidation = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  socialLinksSchema
    .validate(req.body || {}, { abortEarly: false })
    .then(() => next())
    .catch((err) => {
      const errorResponse = {
        message: "Validation failed",
        errors: err.inner.map((e: { path?: string; message: string }) => ({
          field: e.path,
          message: e.message,
        })),
      };

      return res.status(400).json(errorResponse);
    });
};
