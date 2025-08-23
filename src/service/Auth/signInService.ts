import prisma from "../../utils/prismaDefault";
import bcrypt from "bcrypt";
export const signInService = async (email: string, password: string) => {
  const account = await prisma.account.findUnique({
    where: {
      provider_providerAccountId: {
        provider: "email",
        providerAccountId: email,
      },
    },
    select: {
      user: true,
      password: true,
    },
  });

  if (!account || !account.password) {
    throw new Error("Invalid credentials: Account not found");
  }

  const isPasswordValid = await bcrypt.compare(password, account.password);
  if (!isPasswordValid) {
    throw new Error("Invalid password");
  }

  return account.user;
};
