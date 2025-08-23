import jwt from "jsonwebtoken";
import { jwtTokenSecret } from "../../config/default";
import prisma from "../../utils/prismaDefault";

export const verifyUserToken = (token: string) => {
  try {
    // Assuming you have a function to verify the token
    const decoded = jwt.verify(token, jwtTokenSecret);

    // If the token is valid, return the decoded user information
    return decoded;
  } catch (error) {
    throw new Error("Invalid or expired token");
  }
};

export const verifyVerificationToken = async (
  verificationToken: string
): Promise<Boolean> => {
  try {
    // Verify the token using your verification logic
    const user = await prisma.account.findUnique({
      where: { verificationToken },
    });

    if (
      !user ||
      !user.verificationTokenExpiresAt ||
      user.verificationTokenExpiresAt < new Date()
    ) {
      throw new Error("Invalid or expired verification token");
    }
    const updateVerificationToken = await prisma.account.update({
      where: { verificationToken },
      data: {
        verificationToken: null, // Clear the token after verification
        user: {
          update: {
            isVerified: true, // Mark the user as verified
          },
        }, // Assuming you want to mark the user as verified
      },
      select: {
        user: {
          select: {
            isVerified: true,
          },
        },
      },
    });
    return updateVerificationToken.user.isVerified;
  } catch (error) {
    throw new Error("Invalid or expired verification token");
  }
};
