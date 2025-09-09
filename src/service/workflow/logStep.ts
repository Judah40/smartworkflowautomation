import prisma from "../../utils/prismaDefault";

type log = {
  runId: string;
  stepId: string;
  status: "SUCCESS" | "FAILED" | "SKIPPED";
  message: string;
};
export const logStep = async (log: log) => {
  const { message, runId, status, stepId } = log;
  return prisma.workflow_logs.create({
    data: {
      message,
      status,
      runId,
      stepId,
    },
  });
};
