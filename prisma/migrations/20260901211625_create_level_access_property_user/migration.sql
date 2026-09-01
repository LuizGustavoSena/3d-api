/*
  Warnings:

  - Added the required column `level_access` to the `users` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "users" ADD COLUMN     "level_access" INTEGER NOT NULL;
