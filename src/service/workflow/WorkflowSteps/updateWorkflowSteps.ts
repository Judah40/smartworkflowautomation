import prisma from "../../../utils/prismaDefault";

type config = {
  event?: string;
  field?: string;
  operator?: string;
  value?: string;
  action?: string;
  templateId?: string;
};
type payload = {
  stepId: string;
  data: {
    config?: config;
    order: number;
    step_type?: "TRIGGER" | "CONDITION" | "ACTION";
  };
};
export const UpdateWorkflowSteps = async (payload: payload) => {
  return await prisma.workflow_steps.update({
    where: {
      id: payload.stepId,
    },
    data: {
      config: payload.data.config,
      order: payload.data.order,
      step_type: payload.data.step_type,
    },
  });
};
