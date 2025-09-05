-- DropForeignKey
ALTER TABLE "task" DROP CONSTRAINT "task_team_id_fkey";

-- DropForeignKey
ALTER TABLE "task" DROP CONSTRAINT "task_worker_id_fkey";

-- AlterTable
ALTER TABLE "task" ALTER COLUMN "team_id" DROP NOT NULL,
ALTER COLUMN "worker_id" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "task" ADD CONSTRAINT "task_worker_id_fkey" FOREIGN KEY ("worker_id") REFERENCES "person"("person_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "task" ADD CONSTRAINT "task_team_id_fkey" FOREIGN KEY ("team_id") REFERENCES "team"("team_id") ON DELETE SET NULL ON UPDATE CASCADE;
