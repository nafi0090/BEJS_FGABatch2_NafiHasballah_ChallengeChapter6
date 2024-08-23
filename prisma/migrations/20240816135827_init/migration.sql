/*
  Warnings:

  - You are about to drop the column `email` on the `account` table. All the data in the column will be lost.
  - You are about to drop the column `password` on the `account` table. All the data in the column will be lost.
  - You are about to drop the column `role` on the `account` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "account_email_key";

-- AlterTable
ALTER TABLE "account" DROP COLUMN "email",
DROP COLUMN "password",
DROP COLUMN "role",
ADD COLUMN     "deskripsi" TEXT NOT NULL DEFAULT 'null',
ADD COLUMN     "judul" TEXT NOT NULL DEFAULT 'null';
