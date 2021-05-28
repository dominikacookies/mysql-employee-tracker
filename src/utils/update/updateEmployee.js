const inquirer = require("inquirer");

const generateChoices = require("../generateChoices");

const updateEmployeeRole = async (db) => {
  const allEmployees = await db.selectAllFromTable("employee")
  
  const allEmployeesWithFullNameKey = allEmployees.map(function (employee) {
    employee.fullName = `${employee.first_name} ${employee.last_name}`
    return employee});
  
  const updateEmployeeRoleQuestions =
    {
    type: "list",
    message: "Which employee's role would you like to update?",
    name: "id",
    choices: generateChoices(allEmployeesWithFullNameKey, "fullName", "id"),
    }
  
  const { id } = await inquirer.prompt(updateEmployeeRoleQuestions)

  let {role_id : roleIdToUpdate} = allEmployeesWithFullNameKey.find((employee) => employee.id == id)

  const allRoles = await db.selectAllFromTable("role")
  const rolesExcludingCurrent = allRoles.filter((role) => role.id == roleIdToUpdate ? false : role)
  const {role_title : currentRoleTitle } = allRoles.find((role) => role.id == roleIdToUpdate)


  console.log(`This employees current role is ${currentRoleTitle}`)
  const updateEmployeeRoleQuestion =
  {
    type: "list",
    message: "Which of the below roles would you like to assign?",
    name: "role_id",
    choices: generateChoices(rolesExcludingCurrent, "role_title", "id"),
  }
  
  let {role_id} = await inquirer.prompt(updateEmployeeRoleQuestion)
  await db.update("employee", {role_id}, "id", id)
}

module.exports = updateEmployeeRole