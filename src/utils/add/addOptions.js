const inquirer = require("inquirer");
const addDepartment = require("./addDepartment");
const addRole = require("./addRole");
const addEmployee = require("./addEmployee");

const addInformation = async (db) => {
  const addOptions = {
    type: "list",
    message: "What information would you like to add?",
    name: "addChoice",
    choices: [
      {
        value: "department",
        name: "Department"
      },
      {
        value: "role",
        name: "Role"
      },
      {
        value: "employee",
        name: "Employee"
      },
      {
        value: "back",
        name: "Go back"
      },
    ]
  }
  
  const { addChoice } = await inquirer.prompt(addOptions);

  switch (addChoice) {
    case "department":
      addDepartment(db)
      break;
      
    case "role":
      addRole(db)
      break;

    case "employee":
      addEmployee(db)
      break;
    case "back":
      break;
  }
}

module.exports = addInformation