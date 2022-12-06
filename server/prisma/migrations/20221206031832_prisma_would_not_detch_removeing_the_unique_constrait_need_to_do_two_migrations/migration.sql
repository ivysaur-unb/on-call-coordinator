/*
  Warnings:

  - You are about to drop the column `day` on the `OnCall` table. All the data in the column will be lost.
  - Added the required column `date` to the `OnCall` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `OnCall` DROP COLUMN `day`,
    ADD COLUMN `date` DATETIME(3) NOT NULL;
