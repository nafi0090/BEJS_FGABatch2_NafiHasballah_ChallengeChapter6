/*
  Warnings:

  - You are about to drop the `account` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "account";

-- CreateTable
CREATE TABLE "files" (
    "id" SERIAL NOT NULL,
    "judul" TEXT NOT NULL DEFAULT 'null',
    "deskripsi" TEXT NOT NULL DEFAULT 'null',
    "images" TEXT NOT NULL DEFAULT 'null',

    CONSTRAINT "files_pkey" PRIMARY KEY ("id")
);
