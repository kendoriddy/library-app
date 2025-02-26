/*
  Warnings:

  - The primary key for the `Book` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `Book` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `Borrowing` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `Borrowing` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `Category` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `Category` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `User` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `User` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `_BookToCategory` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - Changed the type of `studentId` on the `Borrowing` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `bookId` on the `Borrowing` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `A` on the `_BookToCategory` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `B` on the `_BookToCategory` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- DropForeignKey
ALTER TABLE "Borrowing" DROP CONSTRAINT "Borrowing_bookId_fkey";

-- DropForeignKey
ALTER TABLE "Borrowing" DROP CONSTRAINT "Borrowing_studentId_fkey";

-- DropForeignKey
ALTER TABLE "_BookToCategory" DROP CONSTRAINT "_BookToCategory_A_fkey";

-- DropForeignKey
ALTER TABLE "_BookToCategory" DROP CONSTRAINT "_BookToCategory_B_fkey";

-- AlterTable
ALTER TABLE "Book" DROP CONSTRAINT "Book_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "Book_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "Borrowing" DROP CONSTRAINT "Borrowing_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
DROP COLUMN "studentId",
ADD COLUMN     "studentId" INTEGER NOT NULL,
DROP COLUMN "bookId",
ADD COLUMN     "bookId" INTEGER NOT NULL,
ADD CONSTRAINT "Borrowing_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "Category" DROP CONSTRAINT "Category_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "Category_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "User" DROP CONSTRAINT "User_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "User_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "_BookToCategory" DROP CONSTRAINT "_BookToCategory_AB_pkey",
DROP COLUMN "A",
ADD COLUMN     "A" INTEGER NOT NULL,
DROP COLUMN "B",
ADD COLUMN     "B" INTEGER NOT NULL,
ADD CONSTRAINT "_BookToCategory_AB_pkey" PRIMARY KEY ("A", "B");

-- CreateIndex
CREATE INDEX "_BookToCategory_B_index" ON "_BookToCategory"("B");

-- AddForeignKey
ALTER TABLE "Borrowing" ADD CONSTRAINT "Borrowing_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Borrowing" ADD CONSTRAINT "Borrowing_bookId_fkey" FOREIGN KEY ("bookId") REFERENCES "Book"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_BookToCategory" ADD CONSTRAINT "_BookToCategory_A_fkey" FOREIGN KEY ("A") REFERENCES "Book"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_BookToCategory" ADD CONSTRAINT "_BookToCategory_B_fkey" FOREIGN KEY ("B") REFERENCES "Category"("id") ON DELETE CASCADE ON UPDATE CASCADE;
