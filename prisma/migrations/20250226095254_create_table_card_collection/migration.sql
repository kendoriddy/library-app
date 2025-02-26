-- CreateTable
CREATE TABLE "cardCollection" (
    "id" SERIAL NOT NULL,
    "studentId" INTEGER NOT NULL,
    "collectionDate" TIMESTAMP(3) NOT NULL,
    "is_collected" INTEGER DEFAULT 0,

    CONSTRAINT "cardCollection_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "cardCollection_studentId_key" ON "cardCollection"("studentId");

-- AddForeignKey
ALTER TABLE "cardCollection" ADD CONSTRAINT "cardCollection_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
