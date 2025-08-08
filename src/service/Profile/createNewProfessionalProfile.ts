import { UserProfile } from "../../types";
import prisma from "../../utils/prismaDefault";

export const setupProfessionalProfile = async (userProfile: UserProfile) => {
  const { bio, company, companyLocation, position, userId, portfolioUrl } =
    userProfile;

  // 1. Check if the user exists
  const userExist = await prisma.user.findUnique({
    where: { id: userId },
  });
  if (!userExist) {
    throw new Error("User Not Found");
  }

  // 2. Check if a profile already exists for this user
  const userProfileAlreadyCreated = await prisma.professionalProfile.findUnique({
    where: { userId },
  });

  // 3. If a profile is found, throw an error and stop execution
  if (userProfileAlreadyCreated) {
    throw new Error("User Profile Already Set");
  }

  // 4. If no profile exists, create a new one
  const NewProfile = await prisma.professionalProfile.create({
    data: {
      bio,
      company,
      companyLocation,
      portfolioUrl,
      position,
      userId,
    },
    select: {
      id: true,
      bio: true,
      company: true,
      companyLocation: true,
      position: true,
      portfolioUrl: true,
      userId: true,
    },
  });

  return NewProfile;
};