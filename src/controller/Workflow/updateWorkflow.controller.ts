import { Request, Response } from "express";
import { getWorkflowDetails } from "../../service/workflow/getWorkflowDetails";
import { updateWorkflowMetaData } from "../../service/workflow/updateWorkflowMetaData";

export const updateWorkflowController = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { workflowId } = req.params;
  const { name, active } = req.body;

  if (!workflowId) {
    res.status(404).json({
      message: "workflow id required",
    });
    return;
  }
  try {
    const existingWorkflow = await getWorkflowDetails(workflowId);
    if (!existingWorkflow) {
      res.status(404).json({
        message: "workflow not found",
      });
      return;
    }
    const updateWorkflow = await updateWorkflowMetaData({
      workflowId,
      data: {
        active: active || existingWorkflow.active,
        name: name || existingWorkflow.name,
      },
    });
    if (!updateWorkflow) {
      res.status(409).json({
        message: "could not complete workflow update",
      });

      return;
    }

    res.status(201).json({
      message: "successfully updated workflow",
    });
    return;
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    res.status(400).json({ error: errorMessage, status: 400 });
    return;
  }
};
