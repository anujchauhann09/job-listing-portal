-- CreateEnum
CREATE TYPE "JobType" AS ENUM ('FULL_TIME', 'PART_TIME', 'INTERNSHIP', 'CONTRACT');

-- CreateEnum
CREATE TYPE "ExperienceLevel" AS ENUM ('FRESHER', 'JUNIOR', 'MID', 'SENIOR');

-- CreateEnum
CREATE TYPE "RemoteType" AS ENUM ('ONSITE', 'REMOTE', 'HYBRID');

-- CreateEnum
CREATE TYPE "SalaryPeriod" AS ENUM ('MONTHLY', 'YEARLY');

-- CreateEnum
CREATE TYPE "JobStatus" AS ENUM ('DRAFT', 'OPEN', 'CLOSED', 'ARCHIVED');

-- CreateEnum
CREATE TYPE "ApplicationStatus" AS ENUM ('APPLIED', 'SHORTLISTED', 'REJECTED', 'HIRED', 'WITHDRAWN');

-- CreateTable
CREATE TABLE "Job" (
    "id" SERIAL NOT NULL,
    "uuid" TEXT NOT NULL,
    "employerId" INTEGER NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "qualifications" TEXT,
    "responsibilities" TEXT,
    "location" TEXT NOT NULL,
    "jobType" "JobType" NOT NULL,
    "experienceLevel" "ExperienceLevel" NOT NULL,
    "remoteType" "RemoteType" NOT NULL,
    "salaryMin" DECIMAL(65,30),
    "salaryMax" DECIMAL(65,30),
    "salaryCurrency" TEXT,
    "salaryPeriod" "SalaryPeriod",
    "status" "JobStatus" NOT NULL DEFAULT 'OPEN',
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "isDeleted" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Job_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "JobApplication" (
    "id" SERIAL NOT NULL,
    "uuid" TEXT NOT NULL,
    "jobId" INTEGER NOT NULL,
    "jobSeekerId" INTEGER NOT NULL,
    "status" "ApplicationStatus" NOT NULL DEFAULT 'APPLIED',
    "resumeUrl" TEXT,
    "coverLetter" TEXT,
    "appliedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "isDeleted" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "JobApplication_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "JobSkill" (
    "jobId" INTEGER NOT NULL,
    "skillId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "JobSkill_pkey" PRIMARY KEY ("jobId","skillId")
);

-- CreateIndex
CREATE UNIQUE INDEX "Job_uuid_key" ON "Job"("uuid");

-- CreateIndex
CREATE INDEX "Job_employerId_idx" ON "Job"("employerId");

-- CreateIndex
CREATE INDEX "Job_status_idx" ON "Job"("status");

-- CreateIndex
CREATE INDEX "Job_jobType_idx" ON "Job"("jobType");

-- CreateIndex
CREATE INDEX "Job_location_idx" ON "Job"("location");

-- CreateIndex
CREATE UNIQUE INDEX "JobApplication_uuid_key" ON "JobApplication"("uuid");

-- CreateIndex
CREATE INDEX "JobApplication_jobId_idx" ON "JobApplication"("jobId");

-- CreateIndex
CREATE INDEX "JobApplication_jobSeekerId_idx" ON "JobApplication"("jobSeekerId");

-- CreateIndex
CREATE UNIQUE INDEX "JobApplication_jobId_jobSeekerId_key" ON "JobApplication"("jobId", "jobSeekerId");

-- CreateIndex
CREATE INDEX "JobSkill_skillId_idx" ON "JobSkill"("skillId");

-- AddForeignKey
ALTER TABLE "Job" ADD CONSTRAINT "Job_employerId_fkey" FOREIGN KEY ("employerId") REFERENCES "Employer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "JobApplication" ADD CONSTRAINT "JobApplication_jobId_fkey" FOREIGN KEY ("jobId") REFERENCES "Job"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "JobApplication" ADD CONSTRAINT "JobApplication_jobSeekerId_fkey" FOREIGN KEY ("jobSeekerId") REFERENCES "JobSeeker"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "JobSkill" ADD CONSTRAINT "JobSkill_jobId_fkey" FOREIGN KEY ("jobId") REFERENCES "Job"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "JobSkill" ADD CONSTRAINT "JobSkill_skillId_fkey" FOREIGN KEY ("skillId") REFERENCES "Skill"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
