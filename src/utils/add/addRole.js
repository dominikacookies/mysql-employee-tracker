const inquirer = require("inquirer");

const generateChoices = require("../generateChoices");
const { validateAnswerLength, validateIsNumber} = require("../questionValidators")

const addRole = async (db) => {
  const allDepartments = await db.selectAllFromTable("department")
  const newRoleQs = [
    {
      type: "list",
      message: "Which of the below departments would you like to assign the role to?",
      name: "department_id",
      choices: generateChoices(allDepartments, "department_name", "id"),
    },
    {
      type: "input",
      message: "What would you like to set the title of the new role to?",
      name: "role_title",
      validate: (role_title) => { 
        return validateAnswerLength(role_title)
      }
    },
    {
      type: "input",
      message: "What is the salary for this role?",
      name: "salary",
      validate: (salary) => {
        validateIsNumber(salary)
      }
    },
  ]
  const newRole = await inquirer.prompt(newRoleQs)
  parseFloat(newRole.salary).toFixed(2)
  await db.insert("role", newRole)
  return
}

module.exports = addRole