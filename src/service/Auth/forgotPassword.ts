import prisma from "../../utils/prismaDefault";
import bcrypt from "bcrypt";

// Function to handle forgot password logic
export const resetPassword = async (
  verificationToken: string,
  password: string
) => {
  const user = await prisma.account.findUnique({
    where: { verificationToken },
  });

  if (!user) {
    throw new Error("User not found");
  }

  const hashedNewPassword = await bcrypt.hash(password, 10);

  const updatedUser = await prisma.account.update({
    where: { verificationToken },
    data: {
      password: hashedNewPassword,
      verificationToken: null, // Clear the token after password reset
    },
    select: {
      user: {
        select: {
          isVerified: true,
        },
      },
    },
  });

  return updatedUser;
};

// Function to check if a user exists by email
export const checkUserExists = async (email: string) => {
  const user = await prisma.account.findUnique({
    where: {
      provider_providerAccountId: {
        provider: "email",
        providerAccountId: email,
      },
    },
  });

  if (!user) {
    throw new Error("User not found");
  }
  const updateVerificationToken = await prisma.account.update({
    where: {
      provider_providerAccountId: {
        provider: "email",
        providerAccountId: email,
      },
    },
    data: {
      verificationToken: Math.random().toString(36).substring(2, 15), // Generate a new token
    },
    select: {
      verificationToken: true,
    },
  });

  return updateVerificationToken;
};
