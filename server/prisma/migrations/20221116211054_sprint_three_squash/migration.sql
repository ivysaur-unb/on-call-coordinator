/*
  Warnings:

  - Added the required column `password` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Class` MODIFY `grade` ENUM('NINE', 'TEN', 'ELEVEN', 'TWELVE', 'SECONDARY', 'LEVEL_1', 'LEVEL_2', 'LEVEL_3', 'LEVEL_4', 'LEVEL_5') NOT NULL,
    MODIFY `pathway` ENUM('COLLEGE_PREP', 'OPEN', 'WORK_PREP', 'ACADEMIC', 'APPLIED', 'DE_STREAMED') NULL;

-- AlterTable
ALTER TABLE `ScheduledClass` ADD COLUMN `location` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `User` ADD COLUMN `password` VARCHAR(191) NOT NULL;

-- CreateTable
CREATE TABLE `Teachable` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_TeachableToTeacher` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_TeachableToTeacher_AB_unique`(`A`, `B`),
    INDEX `_TeachableToTeacher_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Class` ADD CONSTRAINT `Class_teachableId_fkey` FOREIGN KEY (`teachableId`) REFERENCES `Teachable`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_TeachableToTeacher` ADD CONSTRAINT `_TeachableToTeacher_A_fkey` FOREIGN KEY (`A`) REFERENCES `Teachable`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_TeachableToTeacher` ADD CONSTRAINT `_TeachableToTeacher_B_fkey` FOREIGN KEY (`B`) REFERENCES `Teacher`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
