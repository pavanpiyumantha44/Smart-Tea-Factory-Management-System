/*
  Warnings:

  - You are about to drop the `medical_emergency` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `production` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "medical_emergency" DROP CONSTRAINT "medical_emergency_person_id_fkey";

-- AlterTable
ALTER TABLE "attendance" ADD COLUMN     "marked_by" TEXT;

-- AlterTable
ALTER TABLE "salary" ADD COLUMN     "approved_by" TEXT;

-- DropTable
DROP TABLE "medical_emergency";

-- DropTable
DROP TABLE "production";

-- CreateTable
CREATE TABLE "defined_salaries" (
    "id" TEXT NOT NULL,
    "role_id" TEXT NOT NULL,
    "salary" DOUBLE PRECISION NOT NULL,
    "basic_salary" DOUBLE PRECISION NOT NULL,
    "is_deleted" TEXT NOT NULL DEFAULT 'N',
    "created_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),

    CONSTRAINT "defined_salaries_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Solutions" (
    "solId" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "disease" TEXT,
    "Solution" TEXT,
    "Response" TEXT,
    "is_deleted" TEXT NOT NULL DEFAULT 'N',
    "created_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),

    CONSTRAINT "Solutions_pkey" PRIMARY KEY ("solId")
);

-- AddForeignKey
ALTER TABLE "defined_salaries" ADD CONSTRAINT "defined_salaries_role_id_fkey" FOREIGN KEY ("role_id") REFERENCES "role"("role_id") ON DELETE RESTRICT ON UPDATE CASCADE;
