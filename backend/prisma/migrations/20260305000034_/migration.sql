/*
  Warnings:

  - You are about to drop the column `deleateed_at` on the `book_managements` table. All the data in the column will be lost.
  - You are about to drop the column `desicription` on the `book_managements` table. All the data in the column will be lost.
  - You are about to drop the column `deleateed_at` on the `goals` table. All the data in the column will be lost.
  - You are about to drop the column `deleateed_at` on the `security_question_answers` table. All the data in the column will be lost.
  - You are about to drop the column `deleateed_at` on the `security_questions` table. All the data in the column will be lost.
  - You are about to drop the column `deleateed_at` on the `study_histories` table. All the data in the column will be lost.
  - You are about to drop the column `occurreed_on` on the `study_histories` table. All the data in the column will be lost.
  - You are about to drop the column `deleateed_at` on the `task_goals` table. All the data in the column will be lost.
  - You are about to drop the column `deleateed_at` on the `tasks` table. All the data in the column will be lost.
  - You are about to drop the column `deleateed_at` on the `users` table. All the data in the column will be lost.
  - Added the required column `occurred_on` to the `study_histories` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX `study_histories_occurreed_on_idx` ON `study_histories`;

-- AlterTable
ALTER TABLE `book_managements` DROP COLUMN `deleateed_at`,
    DROP COLUMN `desicription`,
    ADD COLUMN `author` VARCHAR(255) NULL,
    ADD COLUMN `deleted_at` DATETIME(3) NULL,
    ADD COLUMN `description` VARCHAR(1000) NULL,
    ADD COLUMN `rating` INTEGER NULL,
    ADD COLUMN `status` ENUM('TODO', 'READING', 'COMPLETED') NOT NULL DEFAULT 'TODO',
    ADD COLUMN `user_id` INTEGER NULL;

-- AlterTable
ALTER TABLE `goals` DROP COLUMN `deleateed_at`,
    ADD COLUMN `deleted_at` DATETIME(3) NULL,
    ADD COLUMN `progress` INTEGER NOT NULL DEFAULT 0,
    ADD COLUMN `user_id` INTEGER NULL;

-- AlterTable
ALTER TABLE `security_question_answers` DROP COLUMN `deleateed_at`,
    ADD COLUMN `deleted_at` DATETIME(3) NULL;

-- AlterTable
ALTER TABLE `security_questions` DROP COLUMN `deleateed_at`,
    ADD COLUMN `deleted_at` DATETIME(3) NULL;

-- AlterTable
ALTER TABLE `study_histories` DROP COLUMN `deleateed_at`,
    DROP COLUMN `occurreed_on`,
    ADD COLUMN `deleted_at` DATETIME(3) NULL,
    ADD COLUMN `occurred_on` DATETIME(3) NOT NULL,
    ADD COLUMN `user_id` INTEGER NULL;

-- AlterTable
ALTER TABLE `task_goals` DROP COLUMN `deleateed_at`,
    ADD COLUMN `deleted_at` DATETIME(3) NULL;

-- AlterTable
ALTER TABLE `tasks` DROP COLUMN `deleateed_at`,
    ADD COLUMN `category` VARCHAR(255) NULL,
    ADD COLUMN `comment` VARCHAR(1000) NULL,
    ADD COLUMN `deleted_at` DATETIME(3) NULL,
    ADD COLUMN `duration_seconds` INTEGER NULL,
    ADD COLUMN `schedule_date` DATETIME(3) NULL,
    ADD COLUMN `user_id` INTEGER NULL;

-- AlterTable
ALTER TABLE `users` DROP COLUMN `deleateed_at`,
    ADD COLUMN `daily_goal_minutes` INTEGER NOT NULL DEFAULT 120,
    ADD COLUMN `deleted_at` DATETIME(3) NULL,
    ADD COLUMN `language` VARCHAR(255) NULL DEFAULT 'ja',
    ADD COLUMN `notification_onoff` BOOLEAN NOT NULL DEFAULT true,
    ADD COLUMN `theme` VARCHAR(255) NULL DEFAULT 'light';

-- CreateIndex
CREATE INDEX `study_histories_occurred_on_idx` ON `study_histories`(`occurred_on`);
