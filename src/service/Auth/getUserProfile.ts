import prisma from "../../utils/prismaDefault";

export const getUserProfile = async ({ id }: { id: string }) => {
  console.log(id);
  const userProfile = await prisma.account.findFirst({
    where: {
      userId: id,
    },
    include: {
      user: {
        omit: {
          createdAt: true,
          id: true,
          updatedAt: true,
        },
      },
    },
  });

  console.log(userProfile);
  if (!userProfile) {
    throw new Error("user Profile Doesn't exist");
  }
  return userProfile;
};
