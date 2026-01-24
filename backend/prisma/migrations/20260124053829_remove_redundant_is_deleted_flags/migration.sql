/*
  Warnings:

  - You are about to drop the column `isDeleted` on the `Employer` table. All the data in the column will be lost.
  - You are about to drop the column `isDeleted` on the `JobSeeker` table. All the data in the column will be lost.
  - You are about to drop the column `isDeleted` on the `UserProfile` table. All the data in the column will be lost.
  - Added the required column `updatedAt` to the `JobSeekerSkill` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Skill` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Employer" DROP COLUMN "isDeleted";

-- AlterTable
ALTER TABLE "JobSeeker" DROP COLUMN "isDeleted";

-- AlterTable
ALTER TABLE "JobSeekerSkill" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "Skill" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "UserProfile" DROP COLUMN "isDeleted";
