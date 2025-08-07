import prisma from "../../utils/prismaDefault";

export const getUserProfessionalProfile = async (userId: string) => {
  if (!userId) {
    throw new Error("User Id is Required");
  }
  const professionalProfile = await prisma.professionalProfile.findUnique({
    where: { id: userId },
    omit: {
      createdAt: true,
      userId: true,
    },
  });
  if (!professionalProfile) {
    throw new Error("Professional Profile not found");
  }
  return professionalProfile;
};
