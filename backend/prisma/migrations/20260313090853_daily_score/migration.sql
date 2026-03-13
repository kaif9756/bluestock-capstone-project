-- CreateTable
CREATE TABLE "DailyScore" (
    "id" TEXT NOT NULL,
    "userId" TEXT,
    "guestId" TEXT,
    "date" TEXT NOT NULL,
    "score" INTEGER NOT NULL,
    "completionTime" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "DailyScore_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "DailyScore_userId_date_key" ON "DailyScore"("userId", "date");

-- CreateIndex
CREATE UNIQUE INDEX "DailyScore_guestId_date_key" ON "DailyScore"("guestId", "date");
