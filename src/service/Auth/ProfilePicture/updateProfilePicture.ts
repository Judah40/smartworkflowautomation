import { supabaseClient } from "../../../lib/supabaseClient";
import prisma from "../../../utils/prismaDefault";

export const updateProfilePictureService = async ({
  file,
  mimieType,
  userId,
}: {
  file: Buffer;
  mimieType: string;
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
    .upload(filepath, file, {
      contentType: mimieType,
      upsert: true,
    });

  if (error) {
    throw new Error(`Supabase upload failed: ${error.message}`);
  }

  return {
    fileName: profilePictureName,
    path: data.path,
  };
};
