import { supabaseClient } from "../../../lib/supabaseClient";
import prisma from "../../../utils/prismaDefault";

export const deleteProfilePictureService = async ({
  userId,
}: {
  userId: string;
}) => {
  const profilePictureName = await prisma.user.findUnique({
    where: { id: userId },
    select: {
      ProfilePictureUrl: true,
    },
  });

  const filepath = `profile_pictures/${profilePictureName?.ProfilePictureUrl}`;

  const { data, error } = await supabaseClient.storage
    .from("smartworkflowautomationhubbucket")
    .remove([filepath]);

  if (error) {
    throw new Error(`Supabase upload failed: ${error.message}`);
  }

  const updateDb = await prisma.user.update({
    where: { id: userId },
    data: {
      ProfilePictureUrl: null,
    },
  });

  if (!updateDb) {
    return;
  }
  return true;
};
