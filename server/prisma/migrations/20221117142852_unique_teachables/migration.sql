/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `Teachable` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `Teachable_name_key` ON `Teachable`(`name`);
