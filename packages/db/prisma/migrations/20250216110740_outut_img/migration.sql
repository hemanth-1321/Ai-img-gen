/*
  Warnings:

  - Added the required column `userId` to the `Model` table without a default value. This is not possible if the table is not empty.
  - Added the required column `prompt` to the `OutPutImages` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `OutPutImages` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `OutPutImages` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "StatusEnum" AS ENUM ('Pending', 'Completed', 'Failed');

-- AlterTable
ALTER TABLE "Model" ADD COLUMN     "userId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "OutPutImages" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "prompt" TEXT NOT NULL,
ADD COLUMN     "status" "StatusEnum" NOT NULL DEFAULT 'Pending',
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "userId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Model" ADD CONSTRAINT "Model_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OutPutImages" ADD CONSTRAINT "OutPutImages_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
