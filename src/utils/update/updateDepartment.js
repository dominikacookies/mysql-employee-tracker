const inquirer = require("inquirer");

const generateChoices = require("../generateChoices");

const updateDepartment = async (db) => {
  const allDepartments = await db.selectAllFromTable("department")
  const departmentQuestions = [
    {
    type: "list",
    message: "Which department would you like to update?",
    name: "id",
    choices: generateChoices(allDepartments, "department_name", "id"),
    },
    {
      type: "input",
      message: "What would you like to rename this department to?",
      name: "department_name",
    }
  ]

  // destructure new department information from answers
  const { id, department_name} = await inquirer.prompt(departmentQuestions)

  await db.update("department", {department_name}, "id", id)
}

module.exports = updateDepartment