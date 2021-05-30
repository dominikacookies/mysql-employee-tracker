const inquirer = require("inquirer");

const generateChoices = require("../generateChoices");

const updateEmployeeRole = async (db) => {
  const allEmployees = await db.selectAllFromTable("employee")
  
  // create a new key for each employee containing their full name
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
  
  // destructure the id of the employee to update
  const { id } = await inquirer.prompt(updateEmployeeRoleQuestions)
  // find the current role of the relevant employee
  const {role_id : currentRoleId} = allEmployeesWithFullNameKey.find((employee) => employee.id == id)

  // get all roles from db. Identify the current one's title and remove it from the array/
  const allRoles = await db.selectAllFromTable("role")
  const {role_title : currentRoleTitle } = allRoles.find((role) => role.id == currentRoleId)
  const rolesExcludingCurrent = allRoles.filter((role) => role.id == currentRoleId ? false : role)


  console.info(`This employees current role is ${currentRoleTitle}`)
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