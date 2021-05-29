const inquirer = require("inquirer");

const Database = require("./db/Database");
const viewInformation = require("./utils/viewOptions")
const updateInformation = require("./utils/update/updateOptions")
const addInformation = require("./utils/add/addOptions")

const startApp = async () => {
  const db = new Database("company_db");
  await db.start();

  console.info("Welcome to your company tracker!")

  let inProgress = true;

  while (inProgress) {
    await db.displayKeyCompanyInfo()
    const progressQuestions = {
      type: "list",
      message: "What would you like to do?",
      name: "progressChoice",
      choices: [
        {
          short: "View",
          value: "view",
          name: "View information"
        },
        {
          short: "Update",
          value: "update",
          name: "Update information"
        },
        {
          short: "Add",
          value: "add",
          name: "Add information"
        },
        {
          short: "Delete",
          value: "delete",
          name: "Delete information"
        },
        {
          short: "Exit",
          value: "exit",
          name: "Exit the application"
        },
      ]
    }
    const { progressChoice } = await inquirer.prompt(progressQuestions);

    switch (progressChoice) {
      case "VIEW":
        await viewInformation(db)
        break;
      case "UPDATE":
        await updateInformation(db)
        break;
      case "ADD":
        await addInformation(db)
        break;
      case "DELETE":
        console.log("delete");
        break;
      case "EXIT":
        inProgress = false
        db.end()
        break;
    }
  }
  
}

startApp ()