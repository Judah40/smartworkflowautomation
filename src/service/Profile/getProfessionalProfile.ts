import prisma from "../../utils/prismaDefault";

export const getUserProfessionalProfile = async (userId: string) => {
  // console.log(userId);
  if (!userId) {
    throw new Error("User Id is Required");
  }
  const professionalProfile = await prisma.professionalProfile.findUnique({
    where: { userId: userId },
    omit: {
      createdAt: true,
      userId: true,
    },
  });
  // console.log(professionalProfile);
  if (!professionalProfile) {
    throw new Error("Professional Profile not found");
  }
  return professionalProfile;
};
