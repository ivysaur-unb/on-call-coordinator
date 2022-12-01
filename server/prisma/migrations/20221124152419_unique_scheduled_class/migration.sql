/*
  Warnings:

  - A unique constraint covering the columns `[scheduleId,period]` on the table `ScheduledClass` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `ScheduledClass_scheduleId_period_key` ON `ScheduledClass`(`scheduleId`, `period`);
