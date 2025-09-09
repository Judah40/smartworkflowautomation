import { Request, Response } from "express";
import { getRunsByRunsId } from "../../../service/workflow/WorkflowRuns/getRunsByRunsId";
import { getLogsForRuns } from "../../../service/workflow/WorkflowRuns/getLogsForRuns";

export const getLogsForWorkflowRunsController = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { runId } = req.params;
  if (!runId) {
    res.status(404).json({
      message: "run Id required",
    });
  }

  try {
    const runsExist = await getRunsByRunsId(runId);
    if (!runsExist) {
      res.status(404).json({
        message: "No runs for this run Id",
      });

      return;
    }

    const logs = await getLogsForRuns(runId);
    res.status(200).json({
      message: "successfully gotten all logs",
      data: logs,
    });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    res.status(400).json({ error: errorMessage, status: 400 });
    return;
  }
};
