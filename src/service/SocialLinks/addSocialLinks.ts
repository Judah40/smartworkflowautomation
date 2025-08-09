import prisma from "../../utils/prismaDefault";

interface socialTypes {
  linkedIn: string;
  facebook: string;
  instagram: string;
  github: string;
  X: string;
  youtube: string;
  website: string;
  userId: string;
}

export const addSocialLinksService = async (socials: socialTypes) => {
  const { userId, ...updates } = socials;
  // 1. Check if the user exists
  const userExist = await prisma.user.findUnique({
    where: { id: socials.userId },
  });
  if (!userExist) {
    throw new Error("User Not Found");
  }

  //avoid overwritting fields with undefined
  const safeUpdates = Object.fromEntries(
    Object.entries(updates).filter(([_, v]) => v !== undefined)
  );
  console.log(safeUpdates);

  if (Object.keys(safeUpdates).length === 0) {
    throw new Error("No valid fields provided to update.");
  }
  const addSocialLinks = await prisma.socialLinks.upsert({
    where: { userId: socials.userId },
    update: {
      facebook: socials.facebook,
      instagram: socials.instagram,
      github: socials.github,
      linkedIn: socials.linkedIn,
      X: socials.X,
      youtube: socials.youtube,
      website: socials.website,
    },
    create: socials,
    omit: {
      userId: true,
      id: true,
    },
  });

  if (!addSocialLinks) {
    throw new Error("Couldn't add social links");
  }
  return addSocialLinks;
};
