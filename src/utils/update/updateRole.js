const inquirer = require("inquirer");

const generateChoices = require("../generateChoices");

const updateRole = async (db) => {
  const allRoles = await db.selectAllFromTable("role")
  const selectRoleToUpdate =
    {
      type: "list",
      message: "Which role would you like to update?",
      name: "id",
      choices: generateChoices(allRoles, "role_title", "id"),
    }
  
  const { id } = await inquirer.prompt(selectRoleToUpdate)

  let {role_title, salary, department_id} = allRoles.find(role => role.id == id)
  const { department_name : currentDepartment } = await db.selectValue("department_name", "department", "id", department_id)

  console.info(`The details for this role are: title = ${role_title}, salary = ${salary}, department = ${currentDepartment}`)

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

  const { roleUpdateChoice } = await inquirer.prompt(roleUpdateOptions)

  switch (roleUpdateChoice) {
    case "updateTitle":
      const roleTitleQuestion = {
        type: "input",
        message: "What would you like to set the role title to?",
        name: "role_title"
      }
      let {role_title} = await inquirer.prompt(roleTitleQuestion)
      await db.update("role", {role_title}, "id", id)
      break;

    case "updateSalary":
      const salaryQuestion = {
        type: "input",
        message: "What would you like to set the salary to?",
        name: "updatedSalary",
        validate: (salary) => {
          if (isNaN(salary)) {
            return 'Please enter a numerical salary value. Do not enter the currency.';
          } else {
            return true;
          }
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
      
      const {department_id} = await inquirer.prompt(updateRoleDepartmentQuestion)
      await db.update("role", {department_id}, "id", id)

    break;
  }
  
}

module.exports = updateRole