import prisma from "../../utils/prismaDefault";

type config = {
  event?: string;
  field?: string;
  operator?: string;
  value?: string;
  action?: string;
  templateId?: string;
};
type workflow = {
  type: "TRIGGER" | "CONDITION" | "ACTION";
  order: number;
  config: config;
};

type payload = {
  name: string;
  workflow: workflow[];
  userId: string;
};
export const createWorkflow = async (payload: payload) => {
  if (!payload.workflow.length)
    throw new Error("workflow must contain at least one step");

  const stepData = payload.workflow.map((step, idx) => ({
    step_type: step.type,
    config: step.config,
    order: step.order ?? idx + 1,
  }));
  return await prisma.workflows.create({
    data: {
      name: payload.name,
      userId: payload.userId,
      workflow_steps: {
        create: stepData,
      },
    },
    include: {
      workflow_steps: {
        orderBy: { order: "asc" },
      },
    },
  });
};
