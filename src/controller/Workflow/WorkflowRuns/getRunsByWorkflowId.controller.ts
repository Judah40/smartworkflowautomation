import { Request, Response } from "express";
import { getRunsByWorkflowId } from "../../../service/workflow/WorkflowRuns/getRunsByWorkFlowId";

export const getRunsByWorkflowIdController = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { workflowId } = req.params;
  if (!workflowId) {
    res.status(404).json({
      message: "workflow id required",
    });
    return;
  }
  try {
    const response = await getRunsByWorkflowId(workflowId);
    res.status(200).json({
      message: "successfully gotten runs",
      data: response,
    });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    res.status(400).json({ error: errorMessage, status: 400 });
    return;
  }
};
