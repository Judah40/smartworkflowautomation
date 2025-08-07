import { UserProfile } from "../../types";
import prisma from "../../utils/prismaDefault";

export const updateUserProfessionalProfile = async (input: UserProfile) => {
  const { userId, ...updates } = input;

  const exisitingProfile = await prisma.professionalProfile.findUnique({
    where: { userId },
  });
  if (!exisitingProfile) {
    throw new Error("Professional profile not found for this user.");
  }

  //avoid overwritting fields with undefined
  const safeUpdates = Object.fromEntries(
    Object.entries(updates).filter(([_, v]) => v !== undefined)
  );

  if (Object.keys(safeUpdates).length === 0) {
    throw new Error("No valid fields provided to update.");
  }

  const updateProfile = await prisma.professionalProfile.update({
    where: { userId },
    data: safeUpdates,
  });
  return updateProfile;
};
