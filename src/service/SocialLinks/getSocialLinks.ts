import prisma from "../../utils/prismaDefault";

export const getSocialsLinks = async ({ userId }: { userId: string }) => {
  const socialLinks = await prisma.socialLinks.findUnique({
    where: {
      userId,
    },
    omit: {
      id: true,
      userId: true,
    },
  });

  if (!socialLinks) {
    throw new Error("no social links available");
  }
  return socialLinks;
};
