const inquirer = require("inquirer")
const mysql2 = require("mysql2")
const cTable = require('console.table');

const connection = mysql2.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "password",
    database: "employee_trackerDB"
});

connection.connect(err => {
    if (err) throw err;
    console.log('connected as id ' + connection.threadId + '\n');
    startPrompt();
});

// INQUIRER
function startPrompt() {
    selectEmployee();
    inquirer.prompt([
        {
        type: "list",
        message: "What would you like to do?",
        name: "selection",
        choices: [
            "View All Departments",
            "View All Roles",
            "View All Employees", 
            "Add Department",
            "Add Role",
            "Add Employee",
            "Update Employee Role",
            ]
        }
    ]).then(function(choice) {
        switch(choice.selection) {
            case "View All Departments":
                viewAllDept();
                break;
            case "View All Roles":
                viewAllRoles();
                break;
            case "View All Employees":
                viewAllEmployees();
                break;
            case "Add Department":
                addDept();
                break;
            case "Add Role":
                addRole();
                break;
            case "Add Employee":
                addEmployee();
                break;
            case "Update Employee Role":
                updateEmployee();
                break;
        }
    })
}
