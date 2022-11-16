/*
  Warnings:

  - The values [LEVEL_5] on the enum `Class_grade` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the column `location` on the `ScheduledClass` table. All the data in the column will be lost.
  - Made the column `pathway` on table `Class` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `Class` MODIFY `grade` ENUM('NINE', 'TEN', 'ELEVEN', 'TWELVE', 'SECONDARY', 'LEVEL_1', 'LEVEL_2', 'LEVEL_3', 'LEVEL_4') NOT NULL,
    MODIFY `pathway` ENUM('COLLEGE_PREP', 'OPEN', 'WORK_PREP', 'ACADEMIC', 'APPLIED') NOT NULL;

-- AlterTable
ALTER TABLE `ScheduledClass` DROP COLUMN `location`;
