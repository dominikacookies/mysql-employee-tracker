const inquirer = require("inquirer");

const generateChoices = require("../generateChoices");
const { validateAnswerLength } = require("../questionValidators")

const addEmployee = async (db) => {
  allRoles = await db.selectAllFromTable("role")

  const newEmployeeQs = [
    {
      type: "input",
      message: "What is the employee's first name??",
      name: "first_name",
      validate: (first_name) => { 
        return validateAnswerLength(first_name)
      }
    },
    {
      type: "input",
      message: "What is the employee's last name??",
      name: "last_name",
      validate: (last_name) => { 
        return validateAnswerLength(last_name)
      }
    },
    {
      type: "list",
      message: "Which of the below roles would you like to assign the employee to?",
      name: "role_id",
      choices: generateChoices(allRoles, "role_title", "id"),
    },
    {
      type: "confirm",
      message: "Would you like to assign a manager to this employee?",
      name: "hasManager",
    }
  ]

  const newEmployee = await inquirer.prompt(newEmployeeQs)

  if (newEmployee.hasManager == "Y" || "y") {
    // get all employees and add a full name key
    allEmployees = await db.selectAllFromTable("employee")
    const allEmployeesWithFullNameKey = allEmployees.map(function (employee) {
      employee.fullName = `${employee.first_name} ${employee.last_name}`
      return employee});

    const selectManagerQ = 
    {
      type: "list",
      message: "Which of the below employees would you like to assign as the manager?",
      name: "manager_id",
      choices: generateChoices(allEmployeesWithFullNameKey, "fullName", "id"),
    }
    
    const {manager_id} = await inquirer.prompt(selectManagerQ)
    
    // hello :) thanks for marking my work!
    // I tried to set the manager id here using the bracket notation but it didn't work - do you know why this may be?
    newEmployee.manager_id = manager_id
  }
  
  // delete not needed hasManager key
  delete newEmployee.hasManager
  
  await db.insert("employee", newEmployee)
  return
}

module.exports = addEmployee