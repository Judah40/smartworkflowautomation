import { Request, Response } from "express";
import { startWorkflowRun } from "../../../service/workflow/WorkflowRuns/startWorkflowRun";

export const startWorkflowRunController = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { workflowId } = req.params;
  try {
    const response = await startWorkflowRun(workflowId);
    res.status(200).json({
      message: "successfully started workflow",
      data: response,
    });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    res.status(400).json({ error: errorMessage, status: 400 });
    return;
  }
};
