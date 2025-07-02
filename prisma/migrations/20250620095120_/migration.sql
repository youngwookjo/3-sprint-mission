/*
  Warnings:

  - Added the required column `boardType` to the `Comment` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "BoardType" AS ENUM ('usedMarket', 'freeBoard');

-- AlterTable
ALTER TABLE "Comment" ADD COLUMN     "boardType" "BoardType" NOT NULL;
