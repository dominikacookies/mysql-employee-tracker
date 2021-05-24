USE company_db;

INSERT INTO `company_db`.`employee` (`first_name`, `last_name`, `role_id`) VALUES ('Beth', 'Howard', '1');
INSERT INTO `company_db`.`employee` (`first_name`, `last_name`, `role_id`) VALUES ('Christofer', 'Pine', '2');
INSERT INTO `company_db`.`employee` (`first_name`, `last_name`, `role_id`) VALUES ('Kate', 'White', '3');
INSERT INTO `company_db`.`employee` (`first_name`, `last_name`, `role_id`) VALUES ('Holly', 'Baker', '3');
INSERT INTO `company_db`.`employee` (`first_name`, `last_name`, `role_id`) VALUES ('Edward', 'Bith', '4');
INSERT INTO `company_db`.`employee` (`first_name`, `last_name`, `role_id`) VALUES ('John', 'Smith', '5');
INSERT INTO `company_db`.`employee` (`first_name`, `last_name`, `role_id`) VALUES ('Bob', 'Swan', '6');
INSERT INTO `company_db`.`employee` (`first_name`, `last_name`, `role_id`) VALUES ('Tomas', 'Ten', '7');
INSERT INTO `company_db`.`employee` (`first_name`, `last_name`, `role_id`) VALUES ('Alice', 'Terrance', '8');
INSERT INTO `company_db`.`employee` (`first_name`, `last_name`, `role_id`) VALUES ('Hannah', 'File', '9');

UPDATE `company_db`.`employee` SET `manager_id` = '5' WHERE (`id` = '2');
UPDATE `company_db`.`employee` SET `manager_id` = '1' WHERE (`id` = '3');
UPDATE `company_db`.`employee` SET `manager_id` = '1' WHERE (`id` = '4');
UPDATE `company_db`.`employee` SET `manager_id` = '1' WHERE (`id` = '5');
UPDATE `company_db`.`employee` SET `manager_id` = '8' WHERE (`id` = '7');
UPDATE `company_db`.`employee` SET `manager_id` = '9' WHERE (`id` = '10');
