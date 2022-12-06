/*
  Warnings:

  - You are about to drop the column `date` on the `OnCall` table. All the data in the column will be lost.
  - Added the required column `day` to the `OnCall` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `OnCall` DROP COLUMN `date`,
    ADD COLUMN `day` DATETIME(3) NOT NULL;
