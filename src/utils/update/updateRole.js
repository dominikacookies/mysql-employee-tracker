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
  const { department_name } = await db.selectValue("department_name", "department", "id", department_id)

  console.info(`The details for this role are: title = ${role_title}, salary = ${salary}, department = ${department_name}`)

  const roleUpdateOptions = {
    type: "list",
    message: "What information would you like to update?",
    name: "roleUpdateChoice",
    choices: [
      {
        value: "role_title",
        name: "Title"
      },
      {
        value: "salary",
        name: "Salary"
      },
      {
        value: "department_name",
        name: "Department"
      },
    ]
  }

  const { roleUpdateChoice } = await inquirer.prompt(roleUpdateOptions)

  switch (roleUpdateChoice) {
    case "role_title":
      const question = {
        type: "input",
        message: "What would you like to set the role title to?",
        name: "role_title"
      }
    let {role_title} = await inquirer.prompt(question)
    await db.update("role", {role_title}, "id", id)
    break;
  }
  
}

module.exports = updateRole