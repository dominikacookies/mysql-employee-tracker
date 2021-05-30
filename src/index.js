const inquirer = require("inquirer");

const Database = require("./db/Database");
const viewInformation = require("./utils/viewOptions")
const updateInformation = require("./utils/update/updateOptions")
const addInformation = require("./utils/add/addOptions");
const deleteInformation = require("./utils/deleteOptions");

const startApp = async () => {
  const db = new Database("company_db");
  await db.start();

  console.info("Welcome to your company tracker!")

  let inProgress = true;

  while (inProgress) {

    // delay the rendering of company info for better UX
    const delay = () => new Promise(resolve => setTimeout(resolve, 1000));
    const displayCompanyInfo = () => delay().then(() => db.displayKeyCompanyInfo())
    await displayCompanyInfo()

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

    // based on chosen way to progress call relevant fn
    switch (progressChoice) {
      case "view":
        await viewInformation(db)
        break;
      case "update":
        await updateInformation(db)
        break;
      case "add":
        await addInformation(db)
        break;
      case "delete":
        await deleteInformation(db)
        break;
      case "exit":
        inProgress = false
        db.end()
        break;
    }
  }
  
}

startApp ()