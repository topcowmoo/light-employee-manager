// Import dependencies
const express = require("express");
const mysql = require("mysql2");
const inquirer = require("inquirer");
const displayTitle = require("./title");

const PORT = process.env.PORT || 3001;
const app = express();

// Connect to db
const db = mysql.createConnection(
  {
    host: "localhost",
    user: "root",
    port: "3306",
    password: "z8DC2h@K#uZwMab$8MCc",
    database: "employee_manager_db",
  },
  console.log(`Connected to the employee_manager_db database.`)
);




// Display cfont style title before questions
displayTitle();

// Array of questions

const questions = [
  {
    type: "checkbox",
    name: "choices",
    message: "What would you like to do?",
    choices: [
      "View All Departments",
      "View All Roles",
      "View All Employees",
      "Add A Department",
      "Add A Role",
      "Add An Employee",
      "Update An Employee Role",
    ],
  },
];

app.use((req, res) => {
  res.status(404).end();
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// connect to sql
// define questions
// handle user input
