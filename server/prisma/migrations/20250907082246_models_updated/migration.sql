-- AlterEnum
ALTER TYPE "TaskStatus" ADD VALUE 'HOLD';

-- AlterTable
ALTER TABLE "salary" ADD COLUMN     "status" TEXT;
