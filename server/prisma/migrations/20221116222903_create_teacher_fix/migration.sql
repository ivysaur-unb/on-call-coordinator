-- DropForeignKey
ALTER TABLE `Teacher` DROP FOREIGN KEY `Teacher_schoolId_fkey`;

-- AlterTable
ALTER TABLE `Teacher` MODIFY `schoolId` INTEGER NULL;

-- AlterTable
ALTER TABLE `User` MODIFY `password` VARCHAR(191) NULL;

-- AddForeignKey
ALTER TABLE `Teacher` ADD CONSTRAINT `Teacher_schoolId_fkey` FOREIGN KEY (`schoolId`) REFERENCES `School`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
