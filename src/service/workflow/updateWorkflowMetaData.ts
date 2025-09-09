import prisma from "../../utils/prismaDefault";

type payload = {
  workflowId: string;
  data: {
    name?: string;
    active?: boolean;
  };
};
export const updateWorkflowMetaData = async (payload: payload) => {
  return await prisma.workflows.update({
    where: {
      id: payload.workflowId,
    },
    data: payload.data,
  });
};
