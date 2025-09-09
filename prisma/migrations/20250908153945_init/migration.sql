-- CreateEnum
CREATE TYPE "public"."StepType" AS ENUM ('TRIGGER', 'CONDITION', 'ACTION');

-- CreateEnum
CREATE TYPE "public"."RunStatus" AS ENUM ('PENDING', 'RUNNING', 'SUCCESS', 'FAILED');

-- CreateEnum
CREATE TYPE "public"."LogStatus" AS ENUM ('SUCCESS', 'FAILED', 'SKIPPED');

-- CreateTable
CREATE TABLE "public"."Workflows" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Workflows_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Workflow_steps" (
    "id" TEXT NOT NULL,
    "workflowId" TEXT NOT NULL,
    "step_type" "public"."StepType" NOT NULL,
    "config" JSONB NOT NULL,
    "order" INTEGER NOT NULL,

    CONSTRAINT "Workflow_steps_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Workflow_runs" (
    "id" TEXT NOT NULL,
    "workflowId" TEXT NOT NULL,
    "status" "public"."RunStatus" NOT NULL DEFAULT 'PENDING',
    "startedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "finishedAt" TIMESTAMP(3),

    CONSTRAINT "Workflow_runs_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Workflow_logs" (
    "id" TEXT NOT NULL,
    "runId" TEXT NOT NULL,
    "stepId" TEXT NOT NULL,
    "status" "public"."LogStatus" NOT NULL,
    "message" TEXT NOT NULL,
    "timestamp" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Workflow_logs_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Workflows_userId_key" ON "public"."Workflows"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Workflow_steps_workflowId_key" ON "public"."Workflow_steps"("workflowId");

-- CreateIndex
CREATE UNIQUE INDEX "Workflow_runs_workflowId_key" ON "public"."Workflow_runs"("workflowId");

-- AddForeignKey
ALTER TABLE "public"."Workflows" ADD CONSTRAINT "Workflows_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Workflow_steps" ADD CONSTRAINT "Workflow_steps_workflowId_fkey" FOREIGN KEY ("workflowId") REFERENCES "public"."Workflows"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Workflow_runs" ADD CONSTRAINT "Workflow_runs_workflowId_fkey" FOREIGN KEY ("workflowId") REFERENCES "public"."Workflows"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Workflow_logs" ADD CONSTRAINT "Workflow_logs_runId_fkey" FOREIGN KEY ("runId") REFERENCES "public"."Workflow_runs"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Workflow_logs" ADD CONSTRAINT "Workflow_logs_stepId_fkey" FOREIGN KEY ("stepId") REFERENCES "public"."Workflow_steps"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
