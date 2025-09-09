import prisma from "../../../utils/prismaDefault";

export const completeWorkflowRun = async (runId: string, success: boolean) => {
  return await prisma.workflow_runs.update({
    where: { id: runId },
    data: {
      status: success ? "SUCCESS" : "FAILED",
      finishedAt: new Date(),
    },
  });
};
