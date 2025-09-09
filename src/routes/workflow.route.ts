import { Router } from "express";
import { createWorkflowController } from "../controller/Workflow/createWorkflow.controller";
import { getAllWorkflowController } from "../controller/Workflow/getAllWorkflows.controller";
import { getWorkflowDetailsController } from "../controller/Workflow/getWorkflowDetails.controller";
import { updateWorkflowController } from "../controller/Workflow/updateWorkflow.controller";
import { deleteWorkflowController } from "../controller/Workflow/deleteWorkflow.controller";
import { updateWorkflowStepsController } from "../controller/Workflow/WorkflowSetps/updateWorkflowSteps.controller";
import { deleteWorkflowStepsController } from "../controller/Workflow/WorkflowSetps/deleteWorkflowSteps.controller";
import { startWorkflowRunController } from "../controller/Workflow/WorkflowRuns/startWorkflow.controller";
import { getRunsByWorkflowId } from "../service/workflow/WorkflowRuns/getRunsByWorkFlowId";
import { getLogsForWorkflowRunsController } from "../controller/Workflow/WorkflowRuns/getLogsForRuns.controller";
import {
  createWorkflowValidation,
  updateWorkflowStepsValidation,
  updateWorkflowValidation,
} from "../utils/validations/workflowValidations";

const router = Router();

//worflows
router.post("/", createWorkflowValidation, createWorkflowController);
router.get("/", getAllWorkflowController);
router.get("/:workflowId", getWorkflowDetailsController);
router.put("/:workflowId", updateWorkflowValidation, updateWorkflowController);
router.delete("/:workflowId", deleteWorkflowController);

//worflow runs
router.put(
  "/:stepId/steps",
  updateWorkflowStepsValidation,
  updateWorkflowStepsController
);
router.delete("/:stepId/steps", deleteWorkflowStepsController);

//workflow runs
router.post("/:workflowId/run", startWorkflowRunController);
router.get("/:workflowId/runs", getRunsByWorkflowId);

//logs
router.get("/workflow-runs/:runId", getLogsForWorkflowRunsController);

export const workflow = router;
