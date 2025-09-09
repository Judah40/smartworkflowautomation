import { Request, Response } from "express";
import { getAllWorkflow } from "../../service/workflow/getAllWorkflows";

export const getAllWorkflowController = async (
  req: Request,
  res: Response
): Promise<void> => {
  if (!req.user?.id) return;
  try {
    const response = await getAllWorkflow(req.user.id);
    res.status(200).json({
      message: "successfully gotten all workflow",
      data: response,
    });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    res.status(400).json({ error: errorMessage, status: 400 });
    return;
  }
};
