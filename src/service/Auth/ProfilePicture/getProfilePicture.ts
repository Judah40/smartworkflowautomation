import { supabaseClient } from "../../../lib/supabaseClient";
import prisma from "../../../utils/prismaDefault";

export const getProfilePictureService = async ({
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
  const expiresInSeconds = 60 * 60; // 1 hour

  const { data, error } = await supabaseClient.storage
    .from("smartworkflowautomationhubbucket")
    .createSignedUrl(filepath, expiresInSeconds);

  if (error) {
    console.error("Error creating signed URL:", error.message);
    return null;
  }

  console.log("Signed URL:", data.signedUrl);
  return data.signedUrl;
};
