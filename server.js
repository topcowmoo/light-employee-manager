// Import dependencies
const mysql = require("mysql2");
const inquirer = require("inquirer");
const cTable = require("console.table");
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

// db.connect((err) => {
//   if (err) throw err;
//   console.log("Successfully connected to database");

// });

function init() {
  displayTitle();
}

init();

// Define promptQuestions function
const promptQuestions = async () => {
  // Display cfont style title before questions

  await inquirer
    .prompt([
      {
        type: "list",
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
          "End terminal",
        ],
      },
    ])

    .then((answers) => {
      const { choices } = answers;

      console.log("Choice Selected:", choices); // Add this line for logging

      // Execute appropriate function based on user's choice
      switch (choices) {
        case "View all departments":
          showDepartment();
          break;
        case "View all roles":
          showRole();
          break;
        case "View all employees":
          showEmployee();
          break;
        case "Add a department":
          addDepartment();
          break;
        case "Add a role":
          addRole();
          break;
        case "Add an employee":
          addEmployee();
          break;
        case "Update an employee role":
          updateEmployee();
          break;
        case "Update an employee manager":
          updateManager();
          break;
        case "View employees by department":
          employeeDepartment();
          break;
        case "Delete a department":
          deleteDepartment();
          break;
        case "Delete a role":
          deleteRole();
          break;
        case "Delete an employee":
          deleteEmployee();
          break;
        case "View department budgets":
          viewBudget();
          break;
        case "End terminal":
          // Add code to end terminal or exit the program
          console.log("Ending terminal...");
          process.exit(0);
          break;
        default:
          console.log("Invalid choice. Please select again.");
          promptQuestions(); // Prompt again for valid input
          break;
      }
    });
};

// Function to view all departments
const showDepartment = () => {
  console.log("Viewing all Departments...\n");
  const sql = `SELECT department.id AS id, department.name AS department FROM department`;

  db.query(sql, (err, rows) => {
    if (err) {
      console.error("Error viewing departments:", err); // Add this line for error logging
      throw err;
    }
    console.table(rows);
    promptQuestions(); // Call promptQuestions here after displaying departments
  });
};

// Function to view all roles
const showRole = () => {
  console.log("Viewing all Roles...\n");
  const sql = `SELECT role.id, role.title, department.name AS department FROM role INNER JOIN department ON role.department_id = department.id`;

  db.query(sql, (err, rows) => {
    if (err) {
      console.error("Error viewing roles:", err);
      throw err;
    }
    console.table(rows);
    promptQuestions();
  });
};

// Function to view all employees
const showEmployee = () => {
  console.log("Viewing all employees...\n");
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

  db.query(sql, (err, rows) => {
    if (err) {
      console.error("Error viewing employees:", err);
      throw err;
    }
    console.table(rows);
    promptQuestions();
  });
};

// Function to add a department
const addDepartment = () => {
  inquirer
    .prompt([
      {
        type: "input",
        name: "addDept",
        message: "What department do you want to add?",
        validate: (addDept) => {
          if (addDept) {
            return true;
          } else {
            console.log("Please enter a department");
            return false;
          }
        },
      },
    ])
    .then((answer) => {
      const sql = `INSERT INTO department (name)
                  VALUES (?)`;
      db.query(sql, answer.addDept, (err, result) => {
        if (err) {
          console.error("Error adding department:", err);
          throw err;
        }
        console.log("Added " + answer.addDept + " to departments!");
      });
      showDepartment();
    });
};

// Function to add a role
const addRole = () => {
  inquirer
    .prompt([
      {
        type: "input",
        name: "role",
        message: "What role do you want to add?",
        validate: (addRole) => {
          if (addRole) {
            return true;
          } else {
            console.log("Please enter a role");
            return false;
          }
        },
      },
      {
        type: "input",
        name: "salary",
        message: "What is the salary of this role?",
        validate: (addSalary) => {
          if (!isNaN(addSalary)) {
            return true;
          } else {
            console.log("Please enter a valid salary");
            return false;
          }
        },
      },
    ])
    .then((answer) => {
      const params = [answer.role, answer.salary];

      const roleSql = `SELECT name, id FROM department`;

      db.query(roleSql, (err, data) => {
        if (err) {
          console.error("Error fetching departments:", err);
          throw err;
        }

        const dept = data.map(({ name, id }) => ({ name: name, value: id }));

        inquirer
          .prompt([
            {
              type: "list",
              name: "dept",
              message: "What department is this role in?",
              choices: dept,
            },
          ])
          .then((deptChoice) => {
            const dept = deptChoice.dept;
            params.push(dept);

            const sql = `INSERT INTO role (title, salary, department_id)
                        VALUES (?, ?, ?)`;

            db.query(sql, params, (err, result) => {
              if (err) {
                console.error("Error adding role:", err);
                throw err;
              }
              console.log("Added " + answer.role + " to roles!");
            });
            showRole();
          });
      });
    });
};
// Function to add an employee
const addEmployee = () => {
  inquirer
    .prompt([
      {
        type: "input",
        name: "firstName",
        message: "What is the employee's first name?",
        validate: (firstName) => {
          if (firstName) {
            return true;
          } else {
            console.log("Please enter a first name");
            return false;
          }
        },
      },
      {
        type: "input",
        name: "lastName",
        message: "What is the employee's last name?",
        validate: (lastName) => {
          if (lastName) {
            return true;
          } else {
            console.log("Please enter a last name");
            return false;
          }
        },
      },
    ])
    .then((answer) => {
      const params = [answer.firstName, answer.lastName];

      const roleSql = `SELECT role.id, role.title FROM role`;

      db.query(roleSql, (err, data) => {
        if (err) {
          console.error("Error fetching roles:", err);
          throw err;
        }

        const roles = data.map(({ id, title }) => ({ name: title, value: id }));

        inquirer
          .prompt([
            {
              type: "list",
              name: "role",
              message: "What is the employee's role?",
              choices: roles,
            },
          ])
          .then((roleChoice) => {
            const role = roleChoice.role;
            params.push(role);

            const managerSql = `SELECT * FROM employee`;

            db.query(managerSql, (err, data) => {
              if (err) {
                console.error("Error fetching managers:", err);
                throw err;
              }

              const managers = data.map(({ id, first_name, last_name }) => ({
                name: first_name + " " + last_name,
                value: id,
              }));

              inquirer
                .prompt([
                  {
                    type: "list",
                    name: "manager",
                    message: "Who is the employee's manager?",
                    choices: managers,
                  },
                ])
                .then((managerChoice) => {
                  const manager = managerChoice.manager;
                  params.push(manager);

                  const sql = `INSERT INTO employee (first_name, last_name, role_id, manager_id)
                    VALUES (?, ?, ?, ?)`;

                  db.query(sql, params, (err, result) => {
                    if (err) {
                      console.error("Error adding employee:", err);
                      throw err;
                    }
                    console.log("Employee has been added!");

                    
                  });
                  showEmployee();
                });
            });
          });
      });
    });
};

// Function to update an employee role
const updateEmployee = () => {
  const employeeSql = `SELECT * FROM employee`;

  db.query(employeeSql, (err, data) => {
    if (err) {
      console.error("Error fetching employees:", err);
      throw err;
    }

    const employees = data.map(({ id, first_name, last_name }) => ({
      name: first_name + " " + last_name,
      value: id,
    }));

    inquirer
      .prompt([
        {
          type: "list",
          name: "employee",
          message: "Which employee would you like to update?",
          choices: employees,
        },
      ])
      .then((empChoice) => {
        const employee = empChoice.employee;
        const params = [employee];

        const roleSql = `SELECT * FROM role`;

        db.query(roleSql, (err, data) => {
          if (err) {
            console.error("Error fetching roles:", err);
            throw err;
          }

          const roles = data.map(({ id, title }) => ({
            name: title,
            value: id,
          }));

          inquirer
            .prompt([
              {
                type: "list",
                name: "role",
                message: "What is the employee's new role?",
                choices: roles,
              },
            ])
            .then((roleChoice) => {
              const role = roleChoice.role;
              params.push(role);

              let employee = params[0];
              params[0] = role;
              params[1] = employee;

              const sql = `UPDATE employee SET role_id = ? WHERE id = ?`;

              db.query(sql, params, (err, result) => {
                if (err) {
                  console.error("Error updating employee role:", err);
                  throw err;
                }
                console.log("Employee has been updated!");


              });
              showEmployee();
            });
        });
      });
  });
};

// Function to update an employee manager
const updateManager = () => {
  const employeeSql = `SELECT * FROM employee`;

  db.query(employeeSql, (err, data) => {
    if (err) {
      console.error("Error fetching employees:", err);
      throw err;
    }

    const employees = data.map(({ id, first_name, last_name }) => ({
      name: first_name + " " + last_name,
      value: id,
    }));

    inquirer
      .prompt([
        {
          type: "list",
          name: "employee",
          message: "Which employee would you like to update?",
          choices: employees,
        },
      ])
      .then((empChoice) => {
        const employee = empChoice.employee;
        const params = [employee];

        const managerSql = `SELECT * FROM employee`;

        db.query(managerSql, (err, data) => {
          if (err) {
            console.error("Error fetching managers:", err);
            throw err;
          }

          const managers = data.map(({ id, first_name, last_name }) => ({
            name: first_name + " " + last_name,
            value: id,
          }));

          inquirer
            .prompt([
              {
                type: "list",
                name: "manager",
                message: "Who is the employee's manager?",
                choices: managers,
              },
            ])
            .then((managerChoice) => {
              const manager = managerChoice.manager;
              params.push(manager);

              let employee = params[0];
              params[0] = manager;
              params[1] = employee;

              const sql = `UPDATE employee SET manager_id = ? WHERE id = ?`;

              db.query(sql, params, (err, result) => {
                if (err) {
                  console.error("Error updating employee manager:", err);
                  throw err;
                }
                console.log("Employee has been updated!");

              });
              showEmployee();
            });
        });
      });
  });
};

// Function to view employees by department
const employeeDepartment = () => {
  console.log("Showing employee by departments...\n");
  const sql = `SELECT employee.first_name, 
                      employee.last_name, 
                      department.name AS department
               FROM employee 
               LEFT JOIN role ON employee.role_id = role.id 
               LEFT JOIN department ON role.department_id = department.id`;

  db.query(sql, (err, rows) => {
    if (err) {
      console.error("Error viewing employees by department:", err);
      throw err;
    }
    console.table(rows);
    promptQuestions();
  });
};

// Function to delete department
const deleteDepartment = () => {
  const deptSql = `SELECT * FROM department`;

  db.query(deptSql, (err, data) => {
    if (err) {
      console.error("Error fetching departments:", err);
      throw err;
    }

    const dept = data.map(({ name, id }) => ({ name: name, value: id }));

    inquirer
      .prompt([
        {
          type: "list",
          name: "dept",
          message: "What department do you want to delete?",
          choices: dept,
        },
      ])
      .then((deptChoice) => {
        const dept = deptChoice.dept;
        const sql = `DELETE FROM department WHERE id = ?`;

        db.query(sql, dept, (err, result) => {
          if (err) {
            console.error("Error deleting department:", err);
            throw err;
          }
          console.log("Successfully deleted!");

          showDepartment();
        });
      });
  });
};

// Function to delete role
const deleteRole = () => {
  const roleSql = `SELECT * FROM role`;

  db.query(roleSql, (err, data) => {
    if (err) {
      console.error("Error fetching roles:", err);
      throw err;
    }

    const role = data.map(({ title, id }) => ({ name: title, value: id }));

    inquirer
      .prompt([
        {
          type: "list",
          name: "role",
          message: "What role do you want to delete?",
          choices: role,
        },
      ])
      .then((roleChoice) => {
        const role = roleChoice.role;
        const sql = `DELETE FROM role WHERE id = ?`;

        db.query(sql, role, (err, result) => {
          if (err) {
            console.error("Error deleting role:", err);
            throw err;
          }
          console.log("Successfully deleted!");
        });
        showRole();
      });
  });
};

// Function to delete employees
const deleteEmployee = () => {
  const employeeSql = `SELECT * FROM employee`;

  db.query(employeeSql, (err, data) => {
    if (err) {
      console.error("Error fetching employees:", err);
      throw err;
    }

    const employees = data.map(({ id, first_name, last_name }) => ({
      name: first_name + " " + last_name,
      value: id,
    }));

    inquirer
      .prompt([
        {
          type: "list",
          name: "employee",
          message: "Which employee would you like to delete?",
          choices: employees,
        },
      ])
      .then((empChoice) => {
        const employee = empChoice.employee;

        const sql = `DELETE FROM employee WHERE id = ?`;

        db.query(sql, employee, (err, result) => {
          if (err) {
            console.error("Error deleting employee:", err);
            throw err;
          }
          console.log("Successfully Deleted!");

        });
        showEmployee();
      });
  });
};

// Function to view department budget
const viewBudget = () => {
  console.log("Showing budget by department...\n");

  const sql = `SELECT department_id AS id, 
                      department.name AS department,
                      SUM(salary) AS budget
               FROM  role  
               JOIN department ON role.department_id = department.id GROUP BY  department_id`;

  db.query(sql, (err, rows) => {
    if (err) {
      console.error("Error viewing department budget:", err);
      throw err;
    }
    console.table(rows);

    promptQuestions();
  });
};

// Call promptQuestions after successful database connection
promptQuestions();

// Export the db connection for testing purposes
module.exports = db;
