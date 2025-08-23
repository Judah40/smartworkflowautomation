import { supabaseClient } from "../../../lib/supabaseClient";
import prisma from "../../../utils/prismaDefault";
import { generateRandomString } from "../../../utils/randomNameGenerator";

export const uploadProfilePictureService = async ({
  file,
  mimieType,
  userId,
}: {
  file: Buffer;
  mimieType: string;
  userId: string;
}) => {
  const randomName = generateRandomString();
  const filepath = `profile_pictures/${randomName}`;
  // console.log(await supabaseClient.storage.listBuckets());
  const { data, error } = await supabaseClient.storage
    .from("smartworkflowautomationhubbucket")
    .upload(filepath, file, {
      contentType: mimieType,
      upsert: false,
    });

  if (error) {
    throw new Error(`Supabase upload failed: ${error.message}`);
  }

  await prisma.user.update({
    where: { id: userId },
    data: {
      profilePictureUrl: randomName,
    },
  });

  return {
    fileName: randomName,
    path: data.path,
  };
};
