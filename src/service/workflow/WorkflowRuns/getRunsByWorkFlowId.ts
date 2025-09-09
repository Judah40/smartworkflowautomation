import prisma from "../../../utils/prismaDefault";

export const getRunsByWorkflowId = async (workflowId: string) => {
  return await prisma.workflow_runs.findMany({
    where: {
      workflowId,
    },
  });
};
