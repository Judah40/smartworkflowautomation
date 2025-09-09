import { Request, Response } from "express";
import prisma from "../../../utils/prismaDefault";

export const getWorkflowStepById = async (stepId: string) => {
  return await prisma.workflow_steps.findUnique({
    where: {
      id: stepId,
    },
  });
};
