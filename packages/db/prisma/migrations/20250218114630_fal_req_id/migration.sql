/*
  Warnings:

  - Added the required column `falAiRequestId` to the `OutPutImages` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Model" ADD COLUMN     "falAiRequestId" TEXT;

-- AlterTable
ALTER TABLE "OutPutImages" ADD COLUMN     "falAiRequestId" TEXT NOT NULL;
