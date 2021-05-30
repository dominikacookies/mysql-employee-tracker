const cTable = require('console.table')
const inquirer = require("inquirer");

const viewInformation = async (db) => {
  const viewOptionQ = {
    type: "list",
    message: "What information would you like to view?",
    name: "viewChoice",
    choices: [
      {
        short: "Departments",
        value: "departments",
        name: "Department information"
      },
      {
        short: "Roles",
        value: "roles",
        name: "Current roles information"
      },
      {
        short: "Employees",
        value: "employees",
        name: "Employee information"
      },
      {
        short: "Manager's direct reports",
        value: "reports",
        name: "List of all direct reports for a manager"
      },
      {
        value: "back",
        name: "Go back"
      },
    ]
  }

  const { viewChoice } = await inquirer.prompt(viewOptionQ);

  switch (viewChoice) {
    case "departments":
      const dept = await db.getDepartments()
      console.table(dept)
      break;
    case "roles":
      const roles = await db.getRoles()
      console.table(roles)
      break;
    case "employees":
      const employees = await db.getEmployees()
      console.table(employees)
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
  const returnConfirmationQ = {
    type: "list",
    message: "Press 'enter' whenever you're ready to head back to the main menu",
    name: "returnConfirm",
    choices: [
      {
        value: "returnConfirm",
        name: "Back"
      },
    ]
  }

  await inquirer.prompt(returnConfirmationQ);
  return
}


module.exports = viewInformation