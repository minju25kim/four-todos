DROP DATABASE IF EXISTS `four_todos`;
CREATE DATABASE `four_todos`;
USE `four_todos`;

CREATE TABLE `todos` (
  `id` int NOT NULL AUTO_INCREMENT,
  `date` varchar(255) DEFAULT NULL,
  `text` varchar(255) DEFAULT NULL,
  `type` varchar(255), 
  PRIMARY KEY (`id`)
);

INSERT INTO todos (date, text, type)
VALUES ('2024-01-08', 'Finish backend setup', 'do'),
  ('2024-01-09', 'Buy groceries', 'decide'),
  ('2024-01-10', 'Call John', 'delete'),
  ('2024-01-11', 'Prepare presentation', 'delegate');