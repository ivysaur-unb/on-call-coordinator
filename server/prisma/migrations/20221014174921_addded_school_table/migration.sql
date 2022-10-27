/*
  Warnings:

  - You are about to drop the column `specialityProgram` on the `School` table. All the data in the column will be lost.
  - Added the required column `specialityPrograms` to the `School` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `School` DROP COLUMN `specialityProgram`,
    ADD COLUMN `specialityPrograms` VARCHAR(191) NOT NULL;
