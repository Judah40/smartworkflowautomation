/*
  Warnings:

  - Made the column `verificationTokenExpiresAt` on table `User` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "User" ALTER COLUMN "verificationTokenExpiresAt" SET NOT NULL;
