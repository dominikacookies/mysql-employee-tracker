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
        value: "back",
        name: "Go back"
      },
    ]
  }

  const { viewChoice } = await inquirer.prompt(viewOptionQ);

  // based on choice get info from db and render.
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

    case "back":
    break;
  }

  // allows user to choose when to return for better UX
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