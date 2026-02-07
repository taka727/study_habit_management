-- DropForeignKey
ALTER TABLE `security_question_answers` DROP FOREIGN KEY `security_question_answers_question_id_fkey`;

-- DropIndex
DROP INDEX `security_question_answers_question_id_key` ON `security_question_answers`;

-- AddForeignKey
ALTER TABLE `security_question_answers` ADD CONSTRAINT `security_question_answers_question_id_fkey` FOREIGN KEY (`question_id`) REFERENCES `security_questions`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
