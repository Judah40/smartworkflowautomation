import prisma from "../../utils/prismaDefault";

export const getWorkflowDetails = async (workflowId: string) => {
  return await prisma.workflows.findUnique({
    where: { id: workflowId },
    include: {
      workflow_steps: {
        orderBy: { order: "asc" },
      },
      Workflow_runs: {
        include: { logs: true },
        orderBy: { startedAt: "desc" },
        take: 5,
      },
    },
  });
};
