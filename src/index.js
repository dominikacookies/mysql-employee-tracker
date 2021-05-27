const inquirer = require("inquirer");

const Database = require("./db/Database");
const viewInformation = require("./utils/viewOptions")
const updateInformation = require("./utils/update/update")

const startApp = async () => {
  const db = new Database("company_db");
  await db.start();

  console.info("Welcome to your company tracker!")

  let inProgress = true;

  while (inProgress) {
    console.info("Current company information is as follows:")
    db.displayKeyCompanyInfo()
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
          short: "Add",
          value: "ADD",
          name: "Add information"
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
        db.end()
        break;
    }
  }
  

}

startApp ()