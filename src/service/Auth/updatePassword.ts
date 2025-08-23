import prisma from "../../utils/prismaDefault";
import bcrypt from "bcrypt";

export const updatePassword = async (
  email: string,
  oldPassword: string,
  newPassword: string
) => {
  const account = await prisma.account.findUnique({
    where: {
      provider_providerAccountId: {
        provider: "email",
        providerAccountId: email,
      },
    },
  });

  if (!account) {
    throw new Error("User not found");
  }
  if (!account.password) {
    throw new Error("Invalid credentials: Account not found");
  }
  const isOldPasswordValid = await bcrypt.compare(
    oldPassword,
    account.password
  );
  if (!isOldPasswordValid) {
    throw new Error("Invalid old password");
  }

  const hashedNewPassword = await bcrypt.hash(newPassword, 10);

  const updatedUser = await prisma.account.update({
    where: {
      provider_providerAccountId: {
        provider: "email",
        providerAccountId: email,
      },
    },
    data: {
      password: hashedNewPassword,
    },
  });

  return updatedUser;
};
