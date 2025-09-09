import { Request, Response } from "express";
import { getWorkflowStepById } from "../../../service/workflow/WorkflowSteps/getWorkflowStepsById";
import { UpdateWorkflowSteps } from "../../../service/workflow/WorkflowSteps/updateWorkflowSteps";

export const updateWorkflowStepsController = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { stepId } = req.params;
  const { config, order, step_type } = req.body;
  try {
    const stepsExist = await getWorkflowStepById(stepId);
    if (!stepsExist) {
      res.status(404).json({
        message: "Steps not found",
      });
      return;
    }
    const updateStep = await UpdateWorkflowSteps({
      data: {
        order: order || stepsExist?.order,
        config: config || stepsExist?.config,
        step_type: step_type || stepsExist?.step_type,
      },
      stepId,
    });

    if (!updateStep) {
      res.status(409).json({
        message: "could not complete update steps",
      });

      return;
    }

    res.status(201).json({
      message: "successfully updated workflow steps",
    });
    return;
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    res.status(400).json({ error: errorMessage, status: 400 });
    return;
  }
};
