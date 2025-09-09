import prisma from "../../../utils/prismaDefault";

export const startWorkflowRun = async (workflowId: string) => {
  return await prisma.$transaction(async (tx) => {
    const run = await tx.workflow_runs.create({
      data: {
        workflowId,
        status: "RUNNING",
      },
    });
    const worflow = await tx.workflows.findUnique({
      where: { id: workflowId },
      include: { workflow_steps: { orderBy: { order: "asc" } } },
    });

    return { run, worflow };
  });
};
