const mysql = require("mysql");
const cTable = require('console.table');

class Database {
  constructor(database) {
    const dbOptions = {
      host: "localhost",
      port: 3306,
      user: "root",
      password: "password",
      database,
    };

    this.database = database;
    this.connection = mysql.createConnection(dbOptions);
  }

  start() {
    return new Promise((resolve, reject) => {
      const onConnect = (err) => {
        if (err) reject(err);
        console.log(
          `Connection to ${this.database} database was successful with id ${this.connection.threadId}`
        );
        resolve();
      };

      this.connection.connect(onConnect);
    });
  }

  end() {
    this.connection.end();
    console.log(
        `Connection to ${this.database} database has been successfully closed.`
    );
  }

  displayKeyCompanyInfo () {
    return new Promise((resolve, reject) => {
      const handleQuery = (err, rows) => {
        if (err) reject(err.message);
        rows.forEach(row => row.Manager === null ? row.Manager = "None" : row.Manager );

        console.info("Current company information is as follows:")
        console.table(rows)
        console.info("Please note that if a department or role does not have an employee assigned to it, it will not appear in the table.")
        resolve();
      };

      this.connection.query(
        `SELECT employee_role.first_name as "First name" , employee_role.last_name as "Last name", role_title as "Role", salary as "Salary", department_name as "Department", CONCAT ( employee_manager.first_name, " ", employee_manager.last_name) as "Manager"
        FROM employee employee_role 
        LEFT JOIN role 
        ON employee_role.role_id=role.id 
        LEFT JOIN department
        ON role.department_id=department.id
        LEFT JOIN employee employee_manager
        ON employee_role.manager_id=employee_manager.id;`,
        handleQuery
      );
    });
  }

  selectAllFromTable (tableName) {
    return new Promise((resolve, reject) => {
      const handleQuery = (err, rows) => {
        if (err) reject(err);
        resolve(rows);
      };

      this.connection.query(`SELECT * FROM ${tableName}`, handleQuery);
    });
  }

  selectValue (columnContainingValue, tableName, conditionColumn, conditionValue) {
        return new Promise((resolve, reject) => {
      const handleQuery = (err, rows) => {
        if (err) reject(err);
        const valueObject = rows[0]
        resolve(valueObject);
      };

      this.connection.query(`SELECT ${columnContainingValue} FROM ${tableName} WHERE ??="?";`, 
      [conditionColumn, conditionValue],
      handleQuery);
    });
  }

  getDepartments () {
    return new Promise((resolve, reject) => {
      const handleQuery = (err, rows) => {
        if (err) reject(err);
        resolve(rows);
      };

      this.connection.query(`SELECT department_name as "Department", role_title as "Roles" FROM department LEFT JOIN role ON department.id=role.department_id;`, handleQuery);
    });
  }

  getRoles () {
    return new Promise((resolve, reject) => {
      const handleQuery = (err, rows) => {
        if (err) reject(err);
        resolve(rows);
      };

      this.connection.query(`SELECT role_title as "Role", salary as "Salary", department_name as "Department" FROM role LEFT JOIN department ON role.department_id=department.id;`, handleQuery);
    });
  }

  getEmployees () {
    return new Promise((resolve, reject) => {
      const handleQuery = (err, rows) => {
        if (err) reject(err);
        resolve(rows);
      };

      this.connection.query(`SELECT first_name as "First name", last_name as "Last name", department_name as "Department", role_title as "Role", salary as "Salary" FROM employee LEFT JOIN role on employee.role_id=role.id LEFT JOIN department on role.department_id=department.id;`, handleQuery);
    });
  }

  deleteRow(tableName, columnName, value) {
    return new Promise((resolve, reject) => {
      const handleQuery = (err, rows) => {
        if (err) reject(err);
        console.log("Successfully deleted data");
        resolve(rows);
      };

      const query = this.connection.query(
        `DELETE FROM ${tableName} WHERE ??="?"`,
        [columnName, value],
        handleQuery
      );
    });
  }

  insert(tableName, data) {
    return new Promise((resolve, reject) => {
      const handleQuery = (err, rows) => {
        if (err) reject(err);
        console.log("Successfully added data");
        resolve(rows);
      };

      this.connection.query(
        `INSERT INTO ${tableName} SET ?`,
        data,
        handleQuery
      );
    });
  }

  update(tableName, data, columnName, value) {
    return new Promise((resolve, reject) => {
      const handleQuery = (err, rows) => {
        if (err) reject(err);
        console.log("Successfully updated data");
        resolve(rows);
      };

      this.connection.query(
        `UPDATE ${tableName} SET ? WHERE ??=?;`,
        [data, columnName, value],
        handleQuery
      );
    });
  }

  getEmployeesByManager (managerId) {
    return new Promise((resolve, reject) => {
      const handleQuery = (err, rows) => {
        if (err) reject(err);
        console.log("Successfully updated data");
        resolve(rows);
      };

      this.connection.query(
        `SELECT CONCAT ( employee_manager.first_name, " ", employee_manager.last_name) as "Manager name", employee_role.first_name as "Report first name" , employee_role.last_name as "Report last name"
        FROM employee employee_role 
        INNER JOIN employee employee_manager
        ON employee_role.manager_id=employee_manager.id
        WHERE employee_role.manager_id = ${managerId}`,
        handleQuery
      );
    });
  }
}

module.exports = Database;
