const cTable = require('console.table')
const inquirer = require("inquirer");

const generateChoices = require("../generateChoices")

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
        short: "Employees",
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

  switch (updateChoice) {
    case "departments":
      const allDepartments = await db.selectAllFromTable("department")
      const departmentQuestion = {
        type: "list",
        message: "Select which department you'd like to update",
        name: "departmentId",
        choices: generateChoices(allDepartments, "department_name"),
      }
      console.log(departmentQuestion)
      break;
    case "roles":
      break;
    case "employees":
      break;
    case "reports":
      // const employeesList = await db.selectAllFromTable("employee")
      // const managerIds = employeesList.map(({manager_id}) => manager_id )


      // // const reducer = (acc, employee) => employee.manager_id ? acc.push(employee.manager_id) : acc;
      // // const managerIds = employeesList.reduce(reducer)

      // const allManagerIds = employeesList.filter((employee) => managerIds.includes(employee.id) ? employee : false)
      // console.log(allManagerIds)
      break;
    case "back":
      break;
  }
}

module.exports = updateInformation