const inquirer = require("inquirer");

const generateChoices = require("../generateChoices");
const { validateAnswerLength, validateIsNumber} = require("../questionValidators")

const updateRole = async (db) => {
  const allRoles = await db.selectAllFromTable("role")
  const selectRoleToUpdate =
    {
      type: "list",
      message: "Which role would you like to update?",
      name: "id",
      choices: generateChoices(allRoles, "role_title", "id"),
    }
  
  // destructure id of role to update
  const { id } = await inquirer.prompt(selectRoleToUpdate)

  // get info about chosen role and display it
  const {role_title : currentTitle , salary : currentSalary, department_id : currentDepartmentId} = allRoles.find(role => role.id == id)
  const { department_name : currentDepartment } = await db.selectValue("department_name", "department", "id", currentDepartmentId)

  console.info(`The details for this role are: title = ${currentTitle}, salary = ${currentSalary}, department = ${currentDepartment}`)
  
  const roleUpdateOptions = {
    type: "list",
    message: "What information would you like to update?",
    name: "roleUpdateChoice",
    choices: [
      {
        value: "updateTitle",
        name: "Title"
      },
      {
        value: "updateSalary",
        name: "Salary"
      },
      {
        value: "updateDepartment",
        name: "Department"
      },
    ]
  }

  // user chooses what about the role they'd like to update
  const { roleUpdateChoice } = await inquirer.prompt(roleUpdateOptions)

  switch (roleUpdateChoice) {
    case "updateTitle":
      const roleTitleQuestion = {
        type: "input",
        message: "What would you like to set the role title to?",
        name: "role_title",
        validate: (role_title) => { 
          return validateAnswerLength(role_title)
        }
      }

      const {role_title} = await inquirer.prompt(roleTitleQuestion)
      await db.update("role", {role_title}, "id", id)

    break;

    case "updateSalary":
      const salaryQuestion = {
        type: "input",
        message: "What would you like to set the salary to?",
        name: "updatedSalary",
        validate: (salary) => {
          return validateIsNumber(salary)
        }
      }
      const {updatedSalary} = await inquirer.prompt(salaryQuestion)
      salary = parseFloat(updatedSalary).toFixed(2)
      await db.update("role", {salary}, "id", id)

    break;

    case "updateDepartment":
      const allDepartments = await db.selectAllFromTable("department")
      const departmentsExcludingCurrent = allDepartments.filter((department) => department.department_name == currentDepartment ? false : department)

      const updateRoleDepartmentQuestion =
        {
          type: "list",
          message: "Which of the below departments would you like to assign this role to?",
          name: "department_id",
          choices: generateChoices(departmentsExcludingCurrent, "department_name", "id"),
        }
      
      // I tried to chain the filter fn on line 92 but this resulted in an error - would you know why?
      const {department_id} = await inquirer.prompt(updateRoleDepartmentQuestion)
      await db.update("role", {department_id}, "id", id)

    break;
  }
  
}

module.exports = updateRole