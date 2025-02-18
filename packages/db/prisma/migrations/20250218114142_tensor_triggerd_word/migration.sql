-- AlterTable
ALTER TABLE "Model" ADD COLUMN     "tensorPath" TEXT,
ADD COLUMN     "trainingStatus" "StatusEnum" NOT NULL DEFAULT 'Pending',
ADD COLUMN     "triggeredWord" TEXT;

-- AlterTable
ALTER TABLE "TrainingImages" ALTER COLUMN "imageUrl" SET DEFAULT '';
