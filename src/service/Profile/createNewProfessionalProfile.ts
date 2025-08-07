import { UserProfile } from "../../types";
import prisma from "../../utils/prismaDefault";

export const setupProfessionalProfile = async (userProfile: UserProfile) => {
  const { bio, company, companyLocation, position, userId, portfolioUrl } =
    userProfile;
  const userExist = await prisma.user.findUnique({
    where: { id: userId },
  });
  if (!userExist) {
    throw new Error("User Not Found");
  }

  const userProfileAlreadyCreated = await prisma.professionalProfile.findUnique(
    {
      where: {
        userId,
      },
    }
  );

  if (userProfileAlreadyCreated) {
    throw new Error("User Profile Already Set");
  }

  //setup new profile
  const NewProfile = await prisma.professionalProfile.create({
    data: {
      bio,
      company,
      companyLocation,
      portfolioUrl,
      position,
      userId,
    },
    omit: {
      createdAt: true,
      updatedAt: true,
    },
  });

  return NewProfile;
};
