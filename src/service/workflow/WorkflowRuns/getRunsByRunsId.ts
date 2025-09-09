import prisma from "../../../utils/prismaDefault";

export const getRunsByRunsId = async (runId: string) => {
  return await prisma.workflow_runs.findMany({
    where: {
      id: runId,
    },
  });
};
