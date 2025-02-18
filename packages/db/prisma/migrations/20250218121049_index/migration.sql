-- DropIndex
DROP INDEX "Model_falAiRequestId_key";

-- DropIndex
DROP INDEX "OutPutImages_falAiRequestId_key";

-- CreateIndex
CREATE INDEX "Model_falAiRequestId_idx" ON "Model"("falAiRequestId");

-- CreateIndex
CREATE INDEX "OutPutImages_falAiRequestId_idx" ON "OutPutImages"("falAiRequestId");
