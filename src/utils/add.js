const inquirer = require("inquirer");

const generateChoices = require("./generateChoices");
const { validateAnswerLength, validateIsNumber} = require("./questionValidators")

const addInformation = async (db) => {
  const addOptions = {
    type: "list",
    message: "What information would you like to add?",
    name: "addChoice",
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
  
  const { addChoice } = await inquirer.prompt(addOptions);

  switch (addChoice) {
    case "department":
      const newDepartmentQs = {
        type: "input",
        message: "What would you like to call the new department?",
        name: "department_name",
        validate: (department_name) => { 
          return validateAnswerLength(department_name)
        }
      }

      const newDepartment = await inquirer.prompt(newDepartmentQs)
      await db.insert("department", {newDepartment})
      break;
      
    case "role":
      const allDepartments = await db.selectAllFromTable("department")
      const newRoleQs = [
        {
          type: "list",
          message: "Which of the below departments would you like to assign the role to?",
          name: "department_id",
          choices: generateChoices(allDepartments, "department_name", "id"),
        },
        {
          type: "input",
          message: "What would you like to set the title of the new role to?",
          name: "role_title",
          validate: (role_title) => { 
            return validateAnswerLength(role_title)
          }
        },
        {
          type: "input",
          message: "What is the salary for this role?",
          name: "salary",
          validate: (salary) => {
            validateIsNumber(salary)
          }
        },
      ]
      const newRole = await inquirer.prompt(newRoleQs)
      parseFloat(newRole.salary).toFixed(2)
      await db.insert("role", newRole)
      break;

    case "employee":
      allRoles = await db.selectAllFromTable("role")

      const newEmployeeQs = [
        {
          type: "input",
          message: "What is the employee's first name??",
          name: "first_name",
          validate: (first_name) => { 
            return validateAnswerLength(first_name)
          }
        },
        // {
        //   type: "input",
        //   message: "What is the employee's first name??",
        //   name: "first_name",
        //   validate: (first_name) => { 
        //     if (first_name.length > 30) {
        //       return "Please enter a title that's shorter than 30 characters."
        //     } else {
        //       return true
        //     }
        //   }
        // },
        // {
        //   type: "list",
        //   message: "Which of the below departments would you like to assign the role to?",
        //   name: "department_id",
        //   choices: generateChoices(allDepartments, "department_name", "id"),
        // },
        // {
        //   type: "input",
        //   message: "What would you like to set the title of the new role to?",
        //   name: "role_title",
        //   validate: (role_title) => { 
        //     if (role_title.length > 30) {
        //       return "Please enter a title that's shorter than 30 characters."
        //     } else {
        //       return true
        //     }
        //   }
        // },
        // {
        //   type: "input",
        //   message: "What is the salary for this role?",
        //   name: "salary",
        //   validate: (salary) => {
        //     if (isNaN(salary)) {
        //       return 'Please enter a numerical salary value. Do not enter the currency.';
        //     } else {
        //       return true;
        //     }
        //   }
        // },
      ]

      const newEmployee = await inquirer.prompt(newEmployeeQs)

      break;
    case "back":
      break;
  }
}

module.exports = addInformation