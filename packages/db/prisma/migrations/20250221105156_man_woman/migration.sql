/*
  Warnings:

  - The values [Men,Women] on the enum `ModelTypeEnum` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "ModelTypeEnum_new" AS ENUM ('Man', 'Woman', 'Others');
ALTER TABLE "Model" ALTER COLUMN "type" TYPE "ModelTypeEnum_new" USING ("type"::text::"ModelTypeEnum_new");
ALTER TYPE "ModelTypeEnum" RENAME TO "ModelTypeEnum_old";
ALTER TYPE "ModelTypeEnum_new" RENAME TO "ModelTypeEnum";
DROP TYPE "ModelTypeEnum_old";
COMMIT;

-- AlterTable
ALTER TABLE "Model" ALTER COLUMN "zipUrl" DROP NOT NULL;
