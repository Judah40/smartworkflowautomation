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
      profilePictureUrl: true,
    },
  });

  const filepath = `profile_pictures/${profilePictureName?.profilePictureUrl}`;

  const { data, error } = await supabaseClient.storage
    .from("smartworkflowautomationhubbucket")
    .remove([filepath]);

  if (error) {
    throw new Error(`Supabase upload failed: ${error.message}`);
  }

  const updateDb = await prisma.user.update({
    where: { id: userId },
    data: {
      profilePictureUrl: null,
    },
  });

  if (!updateDb) {
    return;
  }
  return true;
};
