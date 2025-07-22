import prisma from "../../utils/prismaDefault";
import bcrypt from "bcrypt";

export const updatePassword = async (
  email: string,
  oldPassword: string,
  newPassword: string
) => {
  const user = await prisma.user.findUnique({
    where: { email },
  });

  if (!user) {
    throw new Error("User not found");
  }

  const isOldPasswordValid = await bcrypt.compare(oldPassword, user.password);
  if (!isOldPasswordValid) {
    throw new Error("Invalid old password");
  }

  const hashedNewPassword = await bcrypt.hash(newPassword, 10);

  const updatedUser = await prisma.user.update({
    where: { email },
    data: {
      password: hashedNewPassword,
    },
  });

  return updatedUser;
};
