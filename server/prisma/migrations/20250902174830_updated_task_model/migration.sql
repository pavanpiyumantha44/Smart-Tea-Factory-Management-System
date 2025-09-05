/*
  Warnings:

  - A unique constraint covering the columns `[task_code]` on the table `task` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "task" ADD COLUMN     "additional_notes" TEXT,
ADD COLUMN     "task_code" SERIAL NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "task_task_code_key" ON "task"("task_code");
