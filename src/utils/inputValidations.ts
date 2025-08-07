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
  console.log(req.body);
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
