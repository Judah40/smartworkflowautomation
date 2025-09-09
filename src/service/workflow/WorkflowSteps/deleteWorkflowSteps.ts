import prisma from "../../../utils/prismaDefault";

export const deleteWorkflowSteps = async (stepId: string) => {
  return await prisma.workflow_steps.delete({
    where: {
      id: stepId,
    },
  });
};
