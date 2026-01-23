/*
  Warnings:

  - You are about to alter the column `expectedSalary` on the `JobSeeker` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `Decimal(12,2)`.
  - Made the column `companyName` on table `Employer` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Employer" ADD COLUMN     "isDeleted" BOOLEAN NOT NULL DEFAULT false,
ALTER COLUMN "companyName" SET NOT NULL;

-- AlterTable
ALTER TABLE "JobSeeker" ADD COLUMN     "isDeleted" BOOLEAN NOT NULL DEFAULT false,
ALTER COLUMN "expectedSalary" SET DATA TYPE DECIMAL(12,2);

-- CreateIndex
CREATE INDEX "JobSeeker_currentLocation_idx" ON "JobSeeker"("currentLocation");

-- CreateIndex
CREATE INDEX "JobSeeker_experienceYears_idx" ON "JobSeeker"("experienceYears");
