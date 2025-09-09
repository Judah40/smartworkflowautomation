import { Request, Response } from "express";
import { getWorkflowStepById } from "../../../service/workflow/WorkflowSteps/getWorkflowStepsById";
import { deleteWorkflowSteps } from "../../../service/workflow/WorkflowSteps/deleteWorkflowSteps";

export const deleteWorkflowStepsController = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { stepId } = req.params;
  try {
    const stepsExist = await getWorkflowStepById(stepId);
    if (!stepsExist) {
      res.status(404).json({
        message: "Steps not found",
      });

      return;
    }
    const deleteSteps = await deleteWorkflowSteps(stepId);
    if (!deleteSteps) {
      res.status(409).json({
        message: "couldn't delete steps",
      });
      return;
    }

    res.status(200).json({
      message: "successfully deleted steps",
    });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    res.status(400).json({ error: errorMessage, status: 400 });
    return;
  }
};
