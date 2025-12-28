/*
  Warnings:

  - You are about to drop the column `user_id` on the `book_managements` table. All the data in the column will be lost.
  - You are about to drop the column `user_id` on the `goals` table. All the data in the column will be lost.
  - You are about to drop the column `user_id` on the `study_histories` table. All the data in the column will be lost.
  - You are about to drop the column `user_id` on the `tasks` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[login_name]` on the table `users` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `login_name` to the `users` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `book_managements` DROP FOREIGN KEY `book_managements_user_id_fkey`;

-- DropForeignKey
ALTER TABLE `goals` DROP FOREIGN KEY `goals_user_id_fkey`;

-- DropForeignKey
ALTER TABLE `security_question_answers` DROP FOREIGN KEY `security_question_answers_user_id_fkey`;

-- DropForeignKey
ALTER TABLE `study_histories` DROP FOREIGN KEY `study_histories_user_id_fkey`;

-- DropForeignKey
ALTER TABLE `tasks` DROP FOREIGN KEY `tasks_user_id_fkey`;

-- DropIndex
DROP INDEX `book_managements_user_id_fkey` ON `book_managements`;

-- DropIndex
DROP INDEX `goals_user_id_goal_deadline_idx` ON `goals`;

-- DropIndex
DROP INDEX `study_histories_user_id_occurreed_on_idx` ON `study_histories`;

-- DropIndex
DROP INDEX `tasks_user_id_status_deadline_idx` ON `tasks`;

-- AlterTable
ALTER TABLE `book_managements` DROP COLUMN `user_id`;

-- AlterTable
ALTER TABLE `goals` DROP COLUMN `user_id`;

-- AlterTable
ALTER TABLE `study_histories` DROP COLUMN `user_id`;

-- AlterTable
ALTER TABLE `tasks` DROP COLUMN `user_id`;

-- AlterTable
ALTER TABLE `users` ADD COLUMN `login_name` VARCHAR(255) NOT NULL;

-- CreateIndex
CREATE INDEX `goals_goal_deadline_idx` ON `goals`(`goal_deadline`);

-- CreateIndex
CREATE INDEX `study_histories_occurreed_on_idx` ON `study_histories`(`occurreed_on`);

-- CreateIndex
CREATE INDEX `tasks_status_deadline_idx` ON `tasks`(`status`, `deadline`);

-- CreateIndex
CREATE UNIQUE INDEX `users_login_name_key` ON `users`(`login_name`);
