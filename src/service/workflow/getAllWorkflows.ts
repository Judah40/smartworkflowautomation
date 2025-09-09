import prisma from "../../utils/prismaDefault";

export const getAllWorkflow = async (userId: string) => {
  return await prisma.workflows.findUnique({
    where: { userId },
    omit: {
      userId: true,
    },
  });
};
