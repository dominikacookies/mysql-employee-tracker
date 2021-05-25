const mysql = require("mysql");

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
        if (err) reject(err);
        resolve(rows);
      };

      this.connection.query(
        `SELECT employee_role.first_name as "First name" , employee_role.last_name as "Last name", role_title as "Role", salary as "Salary", department_name as "Department", CONCAT ( employee_manager.first_name, " ", employee_manager.last_name) as "Manager name"
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
        `UPDATE ${tableName} SET ? WHERE ??="?";`,
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

module.exports = Db;