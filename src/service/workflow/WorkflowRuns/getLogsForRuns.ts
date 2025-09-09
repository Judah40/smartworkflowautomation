import prisma from "../../../utils/prismaDefault";

export const getLogsForRuns = async (runId: string) => {
  return await prisma.workflow_logs.findMany({
    where: {
      runId,
    },
  });
};
