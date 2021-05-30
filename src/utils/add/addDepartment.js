const inquirer = require("inquirer");

const { validateAnswerLength} = require("../questionValidators")

const addDepartment = async (db) => {
  const newDepartmentQs = {
    type: "input",
    message: "What would you like to call the new department?",
    name: "department_name",
    validate: (department_name) => { 
      return validateAnswerLength(department_name)
    }
  }

  const {department_name} = await inquirer.prompt(newDepartmentQs)
  await db.insert("department", {department_name})
  return
}

module.exports = addDepartment