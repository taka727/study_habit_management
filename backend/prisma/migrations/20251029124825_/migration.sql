-- CreateTable
CREATE TABLE `task_goal_relations` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `taskId` INTEGER NOT NULL,
    `goalId` INTEGER NOT NULL,

    UNIQUE INDEX `task_goal_relations_taskId_goalId_key`(`taskId`, `goalId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `task_goal_relations` ADD CONSTRAINT `task_goal_relations_taskId_fkey` FOREIGN KEY (`taskId`) REFERENCES `Task`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `task_goal_relations` ADD CONSTRAINT `task_goal_relations_goalId_fkey` FOREIGN KEY (`goalId`) REFERENCES `Goal`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
