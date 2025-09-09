import { Request, Response } from "express";
import { createWorkflow } from "../../service/workflow/createWorkflow";

export const createWorkflowController = async (
  req: Request,
  res: Response
): Promise<void> => {
  if (!req.user?.id) return;
  const { name, workflow } = req.body;
  try {
    const response = await createWorkflow({
      name,
      userId: req.user?.id,
      workflow,
    });

    res.status(200).json({
      message: "successfully created workflow",
      data: response,
    });

    return;
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    res.status(400).json({ error: errorMessage, status: 400 });
    return;
  }
};
