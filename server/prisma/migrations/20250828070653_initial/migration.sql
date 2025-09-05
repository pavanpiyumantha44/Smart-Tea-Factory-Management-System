-- CreateEnum
CREATE TYPE "AttendanceStatus" AS ENUM ('PRESENT', 'ABSENT', 'LEAVE', 'HALFDAY');

-- CreateEnum
CREATE TYPE "TaskStatus" AS ENUM ('ASSIGNED', 'PENDING', 'IN_PROCESS', 'COMPLETED', 'CANCELLED');

-- CreateTable
CREATE TABLE "person" (
    "person_id" TEXT NOT NULL,
    "person_code" TEXT NOT NULL,
    "first_name" TEXT NOT NULL,
    "last_name" TEXT NOT NULL,
    "nic_number" TEXT NOT NULL,
    "email" TEXT,
    "phone" TEXT,
    "address" TEXT,
    "gender" TEXT,
    "dob" TIMESTAMP(3),
    "role_id" TEXT,
    "is_deleted" TEXT NOT NULL DEFAULT 'N',
    "created_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),

    CONSTRAINT "person_pkey" PRIMARY KEY ("person_id")
);

-- CreateTable
CREATE TABLE "role" (
    "role_id" TEXT NOT NULL,
    "user_role" TEXT NOT NULL,
    "description" TEXT,
    "is_deleted" TEXT NOT NULL DEFAULT 'N',
    "created_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),

    CONSTRAINT "role_pkey" PRIMARY KEY ("role_id")
);

-- CreateTable
CREATE TABLE "account" (
    "account_id" TEXT NOT NULL,
    "person_id" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "last_login" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "is_deleted" TEXT NOT NULL DEFAULT 'N',
    "created_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),

    CONSTRAINT "account_pkey" PRIMARY KEY ("account_id")
);

-- CreateTable
CREATE TABLE "attendance" (
    "attendance_id" TEXT NOT NULL,
    "start_dttm" TIMESTAMP(3),
    "end_dttm" TIMESTAMP(3),
    "status" TEXT,
    "work_hours" DECIMAL(65,30) NOT NULL,
    "person_id" TEXT NOT NULL,
    "person_code" TEXT,
    "current_date" TIMESTAMP(3) NOT NULL,
    "is_deleted" TEXT NOT NULL DEFAULT 'N',
    "created_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),

    CONSTRAINT "attendance_pkey" PRIMARY KEY ("attendance_id")
);

-- CreateTable
CREATE TABLE "salary" (
    "salary_id" TEXT NOT NULL,
    "month" TIMESTAMP(3) NOT NULL,
    "basic_salary" DOUBLE PRECISION,
    "ot_payment" DOUBLE PRECISION,
    "total_salary" DOUBLE PRECISION,
    "personId" TEXT NOT NULL,
    "is_deleted" TEXT NOT NULL DEFAULT 'N',
    "created_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),

    CONSTRAINT "salary_pkey" PRIMARY KEY ("salary_id")
);

-- CreateTable
CREATE TABLE "ot_payment" (
    "ot_id" TEXT NOT NULL,
    "person_id" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "hours" DOUBLE PRECISION NOT NULL,
    "rate_per_hour" DOUBLE PRECISION NOT NULL,
    "total_payment" DOUBLE PRECISION NOT NULL,
    "is_deleted" TEXT NOT NULL DEFAULT 'N',
    "created_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),

    CONSTRAINT "ot_payment_pkey" PRIMARY KEY ("ot_id")
);

-- CreateTable
CREATE TABLE "medical_emergency" (
    "me_id" TEXT NOT NULL,
    "person_id" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "description" TEXT,
    "medical_leave" BOOLEAN NOT NULL,
    "is_deleted" TEXT NOT NULL DEFAULT 'N',
    "created_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),

    CONSTRAINT "medical_emergency_pkey" PRIMARY KEY ("me_id")
);

-- CreateTable
CREATE TABLE "task" (
    "task_id" TEXT NOT NULL,
    "task_name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "task_type" TEXT NOT NULL,
    "task_status" "TaskStatus" NOT NULL DEFAULT 'PENDING',
    "start_date_time" TIMESTAMP(3) NOT NULL,
    "end_date_time" TIMESTAMP(3),
    "created_by" TEXT NOT NULL,
    "assigned_supervisor" TEXT NOT NULL,
    "team_id" TEXT NOT NULL,
    "worker_id" TEXT NOT NULL,
    "place_id" TEXT NOT NULL,
    "is_deleted" TEXT NOT NULL DEFAULT 'N',
    "created_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),

    CONSTRAINT "task_pkey" PRIMARY KEY ("task_id")
);

-- CreateTable
CREATE TABLE "place" (
    "place_id" TEXT NOT NULL,
    "place_code" TEXT NOT NULL,
    "description" TEXT,
    "size" DECIMAL(65,30),
    "is_deleted" TEXT NOT NULL DEFAULT 'N',
    "created_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),

    CONSTRAINT "place_pkey" PRIMARY KEY ("place_id")
);

-- CreateTable
CREATE TABLE "team" (
    "team_id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "is_deleted" TEXT NOT NULL DEFAULT 'N',
    "created_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),

    CONSTRAINT "team_pkey" PRIMARY KEY ("team_id")
);

-- CreateTable
CREATE TABLE "team_member" (
    "team_id" TEXT NOT NULL,
    "person_id" TEXT NOT NULL,
    "joined_date" TIMESTAMP(3) NOT NULL,
    "is_deleted" TEXT NOT NULL DEFAULT 'N',
    "created_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),

    CONSTRAINT "team_member_pkey" PRIMARY KEY ("team_id","person_id")
);

-- CreateTable
CREATE TABLE "tea_plucking" (
    "tp_id" TEXT NOT NULL,
    "personId" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "weight_kg" DOUBLE PRECISION NOT NULL,
    "rate_per_kg" DOUBLE PRECISION NOT NULL,
    "total_payment" DOUBLE PRECISION NOT NULL,
    "is_deleted" TEXT NOT NULL DEFAULT 'N',
    "created_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),

    CONSTRAINT "tea_plucking_pkey" PRIMARY KEY ("tp_id")
);

-- CreateTable
CREATE TABLE "vehicle" (
    "vehicle_id" TEXT NOT NULL,
    "vehicle_type" TEXT NOT NULL,
    "plate_number" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'available',
    "image_url" TEXT NOT NULL,
    "is_deleted" TEXT NOT NULL DEFAULT 'N',
    "created_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),

    CONSTRAINT "vehicle_pkey" PRIMARY KEY ("vehicle_id")
);

-- CreateTable
CREATE TABLE "vehicle_usage" (
    "usage_id" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "description" TEXT NOT NULL,
    "vehilce_id" TEXT NOT NULL,
    "driver_id" TEXT NOT NULL,
    "is_deleted" TEXT NOT NULL DEFAULT 'N',
    "created_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),

    CONSTRAINT "vehicle_usage_pkey" PRIMARY KEY ("usage_id")
);

-- CreateTable
CREATE TABLE "stock" (
    "item_id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "unit" TEXT NOT NULL,
    "unit_price" DOUBLE PRECISION NOT NULL,
    "quantity" DOUBLE PRECISION NOT NULL,
    "is_deleted" TEXT NOT NULL DEFAULT 'N',
    "created_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),

    CONSTRAINT "stock_pkey" PRIMARY KEY ("item_id")
);

-- CreateTable
CREATE TABLE "stock_transaction" (
    "transaction_id" TEXT NOT NULL,
    "item_id" TEXT NOT NULL,
    "task_id" TEXT,
    "date" TIMESTAMP(3) NOT NULL,
    "type" TEXT NOT NULL,
    "quantity" DOUBLE PRECISION NOT NULL,
    "reference" TEXT,
    "is_deleted" TEXT NOT NULL DEFAULT 'N',
    "created_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),

    CONSTRAINT "stock_transaction_pkey" PRIMARY KEY ("transaction_id")
);

-- CreateTable
CREATE TABLE "production" (
    "production_id" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "product_name" TEXT NOT NULL,
    "quantity" DOUBLE PRECISION NOT NULL,
    "notes" TEXT,
    "is_deleted" TEXT NOT NULL DEFAULT 'N',
    "created_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),

    CONSTRAINT "production_pkey" PRIMARY KEY ("production_id")
);

-- CreateTable
CREATE TABLE "incident" (
    "incident_id" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "type" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "resolved" BOOLEAN NOT NULL,
    "reported_by" TEXT NOT NULL,
    "is_deleted" TEXT NOT NULL DEFAULT 'N',
    "created_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),

    CONSTRAINT "incident_pkey" PRIMARY KEY ("incident_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "person_person_code_key" ON "person"("person_code");

-- CreateIndex
CREATE UNIQUE INDEX "person_nic_number_key" ON "person"("nic_number");

-- CreateIndex
CREATE UNIQUE INDEX "person_email_key" ON "person"("email");

-- CreateIndex
CREATE UNIQUE INDEX "role_user_role_key" ON "role"("user_role");

-- CreateIndex
CREATE UNIQUE INDEX "account_person_id_key" ON "account"("person_id");

-- CreateIndex
CREATE UNIQUE INDEX "account_username_key" ON "account"("username");

-- CreateIndex
CREATE UNIQUE INDEX "place_place_code_key" ON "place"("place_code");

-- CreateIndex
CREATE UNIQUE INDEX "team_name_key" ON "team"("name");

-- CreateIndex
CREATE UNIQUE INDEX "vehicle_plate_number_key" ON "vehicle"("plate_number");

-- AddForeignKey
ALTER TABLE "person" ADD CONSTRAINT "person_role_id_fkey" FOREIGN KEY ("role_id") REFERENCES "role"("role_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "account" ADD CONSTRAINT "account_person_id_fkey" FOREIGN KEY ("person_id") REFERENCES "person"("person_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "attendance" ADD CONSTRAINT "attendance_person_id_fkey" FOREIGN KEY ("person_id") REFERENCES "person"("person_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "salary" ADD CONSTRAINT "salary_personId_fkey" FOREIGN KEY ("personId") REFERENCES "person"("person_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ot_payment" ADD CONSTRAINT "ot_payment_person_id_fkey" FOREIGN KEY ("person_id") REFERENCES "person"("person_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "medical_emergency" ADD CONSTRAINT "medical_emergency_person_id_fkey" FOREIGN KEY ("person_id") REFERENCES "person"("person_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "task" ADD CONSTRAINT "task_created_by_fkey" FOREIGN KEY ("created_by") REFERENCES "person"("person_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "task" ADD CONSTRAINT "task_assigned_supervisor_fkey" FOREIGN KEY ("assigned_supervisor") REFERENCES "person"("person_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "task" ADD CONSTRAINT "task_worker_id_fkey" FOREIGN KEY ("worker_id") REFERENCES "person"("person_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "task" ADD CONSTRAINT "task_team_id_fkey" FOREIGN KEY ("team_id") REFERENCES "team"("team_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "task" ADD CONSTRAINT "task_place_id_fkey" FOREIGN KEY ("place_id") REFERENCES "place"("place_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "team_member" ADD CONSTRAINT "team_member_team_id_fkey" FOREIGN KEY ("team_id") REFERENCES "team"("team_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "team_member" ADD CONSTRAINT "team_member_person_id_fkey" FOREIGN KEY ("person_id") REFERENCES "person"("person_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tea_plucking" ADD CONSTRAINT "tea_plucking_personId_fkey" FOREIGN KEY ("personId") REFERENCES "person"("person_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "vehicle_usage" ADD CONSTRAINT "vehicle_usage_vehilce_id_fkey" FOREIGN KEY ("vehilce_id") REFERENCES "vehicle"("vehicle_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "vehicle_usage" ADD CONSTRAINT "vehicle_usage_driver_id_fkey" FOREIGN KEY ("driver_id") REFERENCES "person"("person_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "stock_transaction" ADD CONSTRAINT "stock_transaction_item_id_fkey" FOREIGN KEY ("item_id") REFERENCES "stock"("item_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "incident" ADD CONSTRAINT "incident_reported_by_fkey" FOREIGN KEY ("reported_by") REFERENCES "person"("person_id") ON DELETE RESTRICT ON UPDATE CASCADE;
