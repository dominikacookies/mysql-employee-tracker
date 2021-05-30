# mysql-employee-tracker

## Table of Contents
  - [Description](#description)
  - [Key features](#key-features)
  - [Demo video](#demo-video)
  - [Technologies used](#technologies-used)
  - [Installation](#installation)

## Description
This is a command line application which allows a user to view, add, update and delete information in order to manage their internal company set up in terms of: departments, roles and employees.

## Key Features
- the application connects to a local mySql database therefore can be used to manage individual information remotely
- users can view, add, update and delete company information at their leisure. Each action is confirmed using the inquirer package and then reflected in the database
- the application has UX top of mind, users can choose when to head back to the main menu when viewing company information, this prevents them from having to scroll through their console. 
- The most up to date company information is displayed every time the user heads back to the main menu, this way they can see all of the most recent changes holistically.
  
## Demo Video
[Click here to view](./assets/demo/html-generator-demo.mov)

## Technologies Used
- Javascript
- jQuery
- Inquirer
- mySql

## Installation 
- Clone the GitHub project onto your local machine
``` 
git clone https://github.com/dominikacookies/readme-generator.git
```
- Navigate into the project
- Open the project in VSCode
- Open the integrated terminal
- In the terminal, enter: 
  
  ```
  npm i  
  ``` 
  to install all of the packages.
  
  Next, use the schema and seed files to create and seed data into your database.
  
  To start the application enter
  
  ```
  npm run start  
  ``` 

  Ensure that you have installed node.