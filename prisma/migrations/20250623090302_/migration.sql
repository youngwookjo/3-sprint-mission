/*
  Warnings:

  - You are about to drop the column `boardType` on the `Comment` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Comment" DROP COLUMN "boardType",
ADD COLUMN     "productId" TEXT,
ALTER COLUMN "articleId" DROP NOT NULL;

-- DropEnum
DROP TYPE "BoardType";

-- AddForeignKey
ALTER TABLE "Comment" ADD CONSTRAINT "Comment_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE CASCADE ON UPDATE CASCADE;
