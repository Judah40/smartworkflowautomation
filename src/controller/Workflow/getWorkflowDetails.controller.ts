import { Request, Response } from "express";
import { getWorkflowDetails } from "../../service/workflow/getWorkflowDetails";

export const getWorkflowDetailsController = async (
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
    const response = await getWorkflowDetails(workflowId);
    res.status(200).json({
      message: "successfully gotten workflow",
      data: response,
    });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    res.status(400).json({ error: errorMessage, status: 400 });
    return;
  }
};
