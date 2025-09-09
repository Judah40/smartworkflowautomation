import prisma from "../../utils/prismaDefault";

export const deleteWorkflow = async (workflowId: string) => {
  return await prisma.workflows.delete({
    where: {
      id: workflowId,
    },
  });
};
