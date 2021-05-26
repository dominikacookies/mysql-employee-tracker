USE company_db;

-- GET all departments with role information
SELECT department_name as "Department", role_title as "Role" FROM department LEFT JOIN role ON department.id=role.department_id;

-- GET all roles with department information
SELECT role_title as "Role", salary as "Salary", department_name as "Department" FROM role LEFT JOIN department ON role.department_id=department.id;

-- Get all employees with role and department information
SELECT first_name as "First name", last_name as "Last name", department_name as "Department", role_title as "Role", salary as "Salary" FROM employee LEFT JOIN role on employee.role_id=role.id LEFT JOIN department on role.department_id=department.id;

-- Get all employees with role and department information and manager
SELECT employee_role.first_name as "First name" , employee_role.last_name as "Last name", role_title as "Role", salary as "Salary", department_name as "Department", CONCAT ( employee_manager.first_name, " ", employee_manager.last_name) as "Manager name"
FROM employee employee_role 
LEFT JOIN role 
ON employee_role.role_id=role.id 
LEFT JOIN department
ON role.department_id=department.id
LEFT JOIN employee employee_manager
ON employee_role.manager_id=employee_manager.id;

-- Add new employees, roles and departments -- 
INSERT INTO `company_db`.`employee` (`first_name`, `last_name`, `role_id`, `manager_id`) VALUES ('Test', 'Tester', '9', '1');
INSERT INTO `company_db`.`role` (`role_title`, `salary`, `department_id`) VALUES ('Test department', '23000.00', '2');
INSERT INTO `company_db`.`department` (`department_name`) VALUES ('Test department');

-- Update employee role / manager --
UPDATE `company_db`.`employee` SET `role_id` = '5' WHERE (`id` = '11');
UPDATE `company_db`.`employee` SET `manager_id` = '2' WHERE (`id` = '7');

-- Delete employees, roles and departments -- 
DELETE FROM `role` WHERE `id`=10;
DELETE FROM `department` WHERE `id`=1;
DELETE FROM `employee` WHERE `id`=3;


-- Employees by manager --
SELECT CONCAT ( employee_manager.first_name, " ", employee_manager.last_name) as "Manager name", employee_role.first_name as "Report first name" , employee_role.last_name as "Report last name", role_title as "Role"
FROM employee employee_role 
INNER JOIN employee employee_manager
ON employee_role.manager_id=employee_manager.id
INNER JOIN role
ON employee_manager.role_id=role.id;

SELECT CONCAT ( employee_manager.first_name, " ", employee_manager.last_name) as "Manager name", employee_role.first_name as "Report first name" , employee_role.last_name as "Report last name"
FROM employee employee_role 
INNER JOIN employee employee_manager
ON employee_role.manager_id=employee_manager.id
WHERE employee_role.manager_id = 1

-- Utilised budget : NOT CORRECT ATM -- 
SELECT 
	SUM(salary) as "Utilised budget"
FROM
    role
WHERE
    department_id = 2;
