const inquirer = require("inquirer");

const updateDepartment = require('./updateDepartment')
const updateRole = require('./updateRole');
const updateEmployeeRole = require('./updateEmployee')

const updateInformation = async (db) => {
  const updateOptions = {
    type: "list",
    message: "What information would you like to update?",
    name: "updateChoice",
    choices: [
      {
        short: "Departments",
        value: "departments",
        name: "Departments"
      },
      {
        short: "Roles",
        value: "roles",
        name: "Roles"
      },
      {
        short: "Employee role",
        value: "employees",
        name: "Employees"
      },
      {
        value: "back",
        name: "Go back"
      },
    ]
  }

  const { updateChoice } = await inquirer.prompt(updateOptions);

  // calls relevant update fn based on user choice
  switch (updateChoice) {
    case "departments":
      await updateDepartment(db)
      break;
    case "roles":
      await updateRole(db)
      break;

    case "employees":
      await updateEmployeeRole(db)
      break;

    case "back":
      break;
  }
}

module.exports = updateInformation