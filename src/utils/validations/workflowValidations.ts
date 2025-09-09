import { NextFunction, Request, Response } from "express";
import * as yup from "yup";

//SCHEMAS
const configSchema = yup.object({
  event: yup.string().optional(),
  field: yup.string().optional(),
  operator: yup.string().optional(),
  value: yup.string().optional(),
  action: yup.string().optional(),
  templateId: yup.string().optional(),
});

const workflowSchema = yup.object({
  type: yup
    .mixed<"TRIGGER" | "CONDITION" | "ACTION">()
    .oneOf(["TRIGGER", "CONDITION", "ACTION"])
    .required("Step type is required"),
  order: yup.number().integer().positive().required("Order is required"),
  config: configSchema.required("Config is required"),
});

const createWorkflowSchema = yup.object({
  name: yup.string().min(3, "Name must be at least 3 characters").required(),
  workflow: yup
    .array()
    .of(workflowSchema)
    .min(1, "Workflow must contain at least one step")
    .required(),
});

const updateWorkflowStatusSchema = yup.object({
  name: yup
    .string()
    .min(3, "Name must be at least 3 characters")
    .required("Name is required"),
  active: yup.boolean().required("Active status is required"),
});

//VALIDATIONS
export const createWorkflowValidation = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  createWorkflowSchema
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

export const updateWorkflowValidation = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  updateWorkflowStatusSchema
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

export const updateWorkflowStepsValidation = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  workflowSchema
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
