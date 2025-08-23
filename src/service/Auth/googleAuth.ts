import { Profile } from "passport-google-oauth20";
import prisma from "../../utils/prismaDefault";

/**
 * Find existing account by providerAccountId, or create new user+account
 */
export async function findOrCreateGoogleUser(profile: Profile) {
  const googleId = profile.id;
  const email = profile.emails?.[0]?.value;
  const displayName = profile.displayName || "No Name";
  const picture = profile.photos?.[0]?.value;

  if (!email) {
    throw new Error("Google profile does not contain an email");
  }

  // 1. Check if account already exists
  let account = await prisma.account.findUnique({
    where: {
      provider_providerAccountId: {
        provider: "google",
        providerAccountId: googleId,
      },
    },
    include: { user: true },
  });

  if (account) {
    return account.user;
  }

  // 2. If no account, check if user with same email exists
  let user = await prisma.user.findUnique({ where: { email } });

  if (!user) {
    // 3. Create new user if not found
    user = await prisma.user.create({
      data: {
        name: displayName,
        email,
        isVerified: true, // Google verified email already
        profilePictureUrl: picture,
      },
    });
  }

  // 4. Link new Google account
  account = await prisma.account.create({
    data: {
      provider: "google",
      providerAccountId: googleId,
      userId: user.id,
    },
    include: { user: true },
  });

  return account.user;
}

/**
 * Utility: find user by id (used in passport.deserializeUser)
 */
export async function findUserById(id: string) {
  return prisma.user.findUnique({ where: { id } });
}
