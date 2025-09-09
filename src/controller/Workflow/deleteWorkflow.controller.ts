import { Request, Response } from "express";
import { deleteWorkflow } from "../../service/workflow/deleteWorkflow";
import { getWorkflowDetails } from "../../service/workflow/getWorkflowDetails";

export const deleteWorkflowController = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { workflowId } = req.params;
  try {
    //check if workflow exist
    const WorkflowExist = await getWorkflowDetails(workflowId);
    if (!WorkflowExist) {
      res.status(404).json({
        message: "workflow not found",
      });
      return;
    }
    const response = await deleteWorkflow(workflowId);
    if (!response)
      res.status(200).json({
        message: "successfully deleted workflow",
      });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    res.status(400).json({ error: errorMessage, status: 400 });
    return;
  }
};
