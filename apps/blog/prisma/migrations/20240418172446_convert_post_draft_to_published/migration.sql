/*
  Warnings:

  - You are about to drop the column `draft` on the `posts` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "posts" DROP COLUMN "draft",
ADD COLUMN     "published" BOOLEAN NOT NULL DEFAULT false;
