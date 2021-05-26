const inquirer = require("inquirer");

const Database = require("./db/Database");
const viewInformation = require("./utils/view/viewOptions")
const updateInformation = require("./utils/update/update")

const startApp = async () => {
  const db = new Database("company_db");

  db.start();

  let inProgress = true;

  while (inProgress) {
    const progressQuestions = {
      type: "list",
      message: "What would you like to do?",
      name: "progressChoice",
      choices: [
        {
          short: "View",
          value: "VIEW",
          name: "View information"
        },
        {
          short: "Update",
          value: "UPDATE",
          name: "Update information"
        },
        {
          short: "Delete",
          value: "DELETE",
          name: "Delete information"
        },
        {
          short: "Exit",
          value: "EXIT",
          name: "Exit the application"
        },
      ]
    }
    const { progressChoice } = await inquirer.prompt(progressQuestions);

    switch (progressChoice) {
      case "VIEW":
        viewInformation(db)
        break;
      case "UPDATE":
        updateInformation(db)
        break;
      case "DELETE":
        console.log("delete");
        break;
      case "EXIT":
        console.log("exit")
        break;
    }
  }
  

}

startApp ()