DROP DATABASE IF EXISTS `four_todos`;
CREATE DATABASE `four_todos`;
USE `four_todos`;

CREATE TABLE `todos` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `date` VARCHAR(255),
  `text` VARCHAR(255) DEFAULT NULL,
  `type` VARCHAR(255),
  `checked` BOOLEAN DEFAULT false,
  PRIMARY KEY (`id`)
);

INSERT INTO todos (date, text, type, checked)
VALUES ('2024-01-08', 'Finish backend setup', 'do',false),
  ('2024-01-09', 'Buy groceries', 'decide', false),
  ('2024-01-10', 'Call John', 'delete', true),
  (
    '2024-01-11',
    'Prepare presentation',
    'delegate',
    true
  );