/*
  Warnings:

  - A unique constraint covering the columns `[day,period,teacherId]` on the table `Absence` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `Absence_day_period_teacherId_key` ON `Absence`(`day`, `period`, `teacherId`);
