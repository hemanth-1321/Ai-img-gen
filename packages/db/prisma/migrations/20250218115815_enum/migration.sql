/*
  Warnings:

  - A unique constraint covering the columns `[falAiRequestId]` on the table `OutPutImages` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterEnum
ALTER TYPE "StatusEnum" ADD VALUE 'Generated';

-- CreateIndex
CREATE UNIQUE INDEX "OutPutImages_falAiRequestId_key" ON "OutPutImages"("falAiRequestId");
