// Import dependencies
const mysql = require("mysql2");
const inquirer = require("inquirer");
const cTable = require('console.table');
const displayTitle = require("./title");

const PORT = process.env.PORT || 3001;

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
const promptQuestions = () => {
  inquirer.prompt([
    {
      type: "checkbox",
      name: "choices",
      message: "What would you like to do?",
      choices: [
        "View all departments", 
        "View all roles", 
        "View all employees", 
        "Add a department", 
        "Add a role", 
        "Add an employee", 
        "Update an employee role",
        "Update an employee manager",
        "View employees by department",
        "Delete a department",
        "Delete a role",
        "Delete an employee",
        "View department budgets",
        "End terminal"
          ]
    }
  ])

  .then((answers) => {
    const { choices } = answers;

    if (choices === "View all departments") {
      showDepartment();
    }

    if (choices === "View all roles") {
      showRole();
    }

    if (choices === "View all employees") {
      showEmployee();
    }

    if (choices === "Add a department") {
      addDepartment();
    }

    if (choices === "Add a role") {
      addRole();
    }

    if (choices === "Add an employee") {
      addEmployee();
    }

    if (choices === "Update an employee role") {
      updateEmployee();
    }

    if (choices === "Update an employee manager") {
      updateManager();
    }

    if (choices === "View employees by department") {
      employeeDepartment();
    }

    if (choices === "Delete a department") {
      deleteDepartment();
    }

    if (choices === "Delete a role") {
      deleteRole();
    }

    if (choices === "Delete an employee") {
      deleteEmployee();
    }

    if (choices === "View department budgets") {
      viewBudget();
    }

    if (choices === "End connection") {
      connection.end()
  };
});
};

showDepartment = () => {
  console.log("Viewing all Departments...\n");
  const sql = `SELECT department.id AS id, department.name AS department FROM department`;

  connection.promise().query(sql, (err, rows) => {
    if (err) throw err;
    console.table(rows);
    promptQuestions();
  });
};

showRole = () => {
  console.log("Viewing all Roles...\n");
  const sql = `SELECT role.id, role.title, department.name AS department FROM role INNER JOIN department ON role.department_id = department.id`;

  connection.promise().query(sql, (err, rows) => {
    if (err) throw err;
    console.table(rows);
    promptQuestions();
});
};

showEmployee = () => {
  console.log('Viewing all employees...\n'); 
  const sql = `SELECT employee.id, 
                      employee.first_name, 
                      employee.last_name, 
                      role.title, 
                      department.name AS department,
                      role.salary, 
                      CONCAT (manager.first_name, " ", manager.last_name) AS manager
               FROM employee
                      LEFT JOIN role ON employee.role_id = role.id
                      LEFT JOIN department ON role.department_id = department.id
                      LEFT JOIN employee manager ON employee.manager_id = manager.id`;

  connection.promise().query(sql, (err, rows) => {
    if (err) throw err; 
    console.table(rows);
    promptQuestions();
  });
};





    

app.use((req, res) => {
  res.status(404).end();
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});


