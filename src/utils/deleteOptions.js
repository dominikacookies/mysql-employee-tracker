const inquirer = require("inquirer");

const generateChoices = require("./generateChoices")

const deleteInformation = async (db) => {

  const deleteOptionQ = {
    type: "list",
    message: "What information would you like to delete?",
    name: "deleteChoice",
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

  const { deleteChoice } = await inquirer.prompt(deleteOptionQ);

  const allInformation = await db.selectAllFromTable(deleteChoice)


  let questionKeyName = "";

  switch (deleteChoice) {
    case "department":
      questionKeyName = "department_name" 
      break;

    case "role":
      questionKeyName = "role_title"
      break;

    case "employee":
      allInformation.forEach(function (employee) {
        employee.fullName = `${employee.first_name} ${employee.last_name}`
        return employee});
      console.log(allInformation)

      questionKeyName = "fullName"

      break;
  }

  const confirmDeletionChoiceQ = {
    type: "list",
    message: "Please select the one that you'd like to delete",
    name: "id",
    choices: generateChoices(allInformation, questionKeyName, "id")
  }

  const {id} = await inquirer.prompt(confirmDeletionChoiceQ)

  await db.deleteRow(deleteChoice, "id", id)

  return
}

module.exports = deleteInformation