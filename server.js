// Import dependencies
const express = require('express');
const mysql = require('mysql2');
const inquirer = require('inquirer');
const displayTitle = require('./title');


const PORT = process.env.PORT || 3001;
const app = express();

// Express middleware
app.use(express.urlencoded({ extend: false }));
app.use(express.json());

// Connect to db
const db = mysql.createConnection(
    {
        host: 'localhost',
        user: 'root',
        password: '',
        database: 'employee_manager_db'
    },
    console.log(`Connected to the employee_manager_db database.`)
);

// Display cfont style title before questions
displayTitle();






app.use((req, res) => {
    res.status(404).end();
})

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });


// connect to sql
// define questions
// handle user input