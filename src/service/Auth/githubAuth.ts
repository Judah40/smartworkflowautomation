import prisma from "../../utils/prismaDefault";

interface GithubProfile {
  id: string;
  username?: string;
  displayName?: string;
  emails?: { value: string }[];
  photos?: { value: string }[];
}

export const findOrCreateGithubUser = async (profile: GithubProfile) => {
  // Check if account already exists
  let account = await prisma.account.findUnique({
    where: {
      provider_providerAccountId: {
        provider: "github",
        providerAccountId: profile.id,
      },
    },
    include: { user: true },
  });

  if (account) {
    return account.user;
  }

  // Get email (GitHub sometimes hides it, fallback to generated one)
  let email =
    profile.emails?.[0]?.value || `${profile.username || "user"}@github.com`;

  // Find existing user by email
  let user = await prisma.user.findUnique({ where: { email } });

  if (!user) {
    // Create new user
    user = await prisma.user.create({
      data: {
        name: profile.displayName || profile.username || "GitHub User",
        email,
        isVerified: true,
        profilePictureUrl: profile.photos?.[0]?.value,
      },
    });
  }

  // Link GitHub account
  await prisma.account.create({
    data: {
      provider: "github",
      providerAccountId: profile.id,
      userId: user.id,
    },
  });

  return user;
};
