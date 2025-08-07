-- AlterTable
ALTER TABLE "User" ADD COLUMN     "ProfilePictureUrl" TEXT;

-- CreateTable
CREATE TABLE "ProfessionalProfile" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "position" TEXT NOT NULL,
    "company" TEXT NOT NULL,
    "companyLocation" TEXT NOT NULL,
    "bio" TEXT NOT NULL,
    "portfolioUrl" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ProfessionalProfile_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SocialLinks" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "linkedIn" TEXT,
    "facebook" TEXT,
    "instagram" TEXT,
    "github" TEXT,
    "X" TEXT,
    "youtube" TEXT,
    "website" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "SocialLinks_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ProfessionalProfile_userId_key" ON "ProfessionalProfile"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "SocialLinks_userId_key" ON "SocialLinks"("userId");

-- AddForeignKey
ALTER TABLE "ProfessionalProfile" ADD CONSTRAINT "ProfessionalProfile_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SocialLinks" ADD CONSTRAINT "SocialLinks_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
