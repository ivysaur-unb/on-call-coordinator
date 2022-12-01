-- CreateTable
CREATE TABLE `OnCall` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `teacherId` INTEGER NOT NULL,
    `scheduledClassId` INTEGER NOT NULL,
    `date` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `OnCall` ADD CONSTRAINT `OnCall_teacherId_fkey` FOREIGN KEY (`teacherId`) REFERENCES `Teacher`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `OnCall` ADD CONSTRAINT `OnCall_scheduledClassId_fkey` FOREIGN KEY (`scheduledClassId`) REFERENCES `ScheduledClass`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
