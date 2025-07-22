import prisma from "../../utils/prismaDefault";
import bcrypt from "bcrypt";
export const signInService = async (email: string, password: string) => {
  const user = await prisma.user.findUnique({
    where: { email },
    omit: {
      verificationToken: true, // Omit verification token as it's not needed after sign-in
      id: true, // Omit ID if not needed in response
    },
  });

  console.log(user)
  if (!user) {
    throw new Error("User not found");
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    throw new Error("Invalid password");
  }

  return user;
};
