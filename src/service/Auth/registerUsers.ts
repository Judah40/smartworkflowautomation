import prisma from "../../utils/prismaDefault";
import bcrypt from "bcrypt";

export const registerUsersService = async (
  email: string,
  password: string,
  name: string
) => {
  const existingUser = await prisma.user.findUnique({
    where: { email },
  });

  if (existingUser) {
    throw new Error("User already exists");
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const verificationToken = Math.random().toString(36).substring(2, 15); // Simple token generation, consider using a more secure method
  const verificationTokenExpiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000); // expires in 24 hours

  const newUser = await prisma.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
      verificationToken: verificationToken,
      verificationTokenExpiresAt
    },
  });

  return newUser;
};
