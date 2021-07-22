const inquirer = require("inquirer")
const mysql2 = require("mysql2")
const cTable = require('console.table');

const connection = mysql2.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "St3v$n1429",
    database: "employee_trackerDB"
});

connection.connect(err => {
    if (err) throw err;
    console.log('connected as id ' + connection.threadId + '\n');
    startPrompt();
});

// INQUIRER
function startPrompt() {
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
            // "Update Employee Role",
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
            // case "Update Employee Role":
            //     updateEmployee();
            //     break;
        }
    })
}

// VIEW ALL DEPARTMENTS
function viewAllDept() {
    connection.query("SELECT departments.id AS Dept_ID, departments.name AS Department_Name FROM departments;",  
    function(err, res) {
      if (err) throw err
      console.table(res)
      startPrompt()
  })
}

// VIEW ALL ROLES
function viewAllRoles() {
    connection.query("SELECT roles.id AS Role_ID, roles.title As Job_Title, roles.salary as Salary, departments.name AS Department FROM roles INNER JOIN departments on departments.id = roles.department_id;",  
    function(err, res) {
      if (err) throw err
      console.table(res)
      startPrompt()
  })
}

// VIEW ALL EMPLOYEES
function viewAllEmployees() {
    connection.query("SELECT employees.id AS ID, employees.first_name AS First_Name, employees.last_name AS Last_Name, roles.title AS Job_Title, roles.salary as Salary, departments.name as Department, CONCAT(e.first_name, ' ' ,e.last_name) AS Manager FROM employees INNER JOIN roles on roles.id = employees.role_id INNER JOIN departments on departments.id = roles.department_id LEFT JOIN employees e on employees.manager_id = e.id;",  
    function(err, res) {
      if (err) throw err
      console.table(res)
      startPrompt()
  })
}

// SELECT ROLE
var rolesArray = [];
function selectRole() {
    connection.query("SELECT * FROM roles",
    function(err, res) {
        if (err) throw err
        for (i=0; i < res.length; i++) {
            rolesArray.push(res[i].title);
        }
    })
    return rolesArray;
}

// SELECT MANAGERS
var managersArray = []
function selectManager() {
    connection.query("SELECT first_name, last_name FROM employees WHERE manager_id IS NULL",
    function(err, res) {
        if (err) throw err
        for (i=0; i < res.length; i++) {
            managersArray.push(res[i].first_name + " " + res[i].last_name);
        }
    })
    return managersArray;
}

// SELECT DEPARTMENTS
var deptArray = []
function selectDept() {
    connection.query("SELECT * FROM departments",
    function(err, res) {
        if (err) throw err
        for (i=0; i < res.length; i++) {
            deptArray.push(res[i].name);
        }
    })
    return deptArray;
}

// ADD EMPLOYEE
function addEmployee() {
    inquirer.prompt([
        {
            name: "firstname",
            type: "input",
            message: "Enter employee's first name: "
        },
        {
            name: "lastname",
            type: "input",
            message: "Enter employee's last name: "
        },
        {
            name: "role",
            type: "list",
            message: "What is employee's role? ",
            choices: selectRole()
        },
        {
            name: "manager",
            type: "list",
            message: "Who is employee's manager? ",
            choices: selectManager()
        },
    ]).then(function(choice) {
        var roleId = selectRole().indexOf(choice.role) + 1
        var managerId = selectManager().indexOf(choice.manager) + 1
        connection.query("INSERT INTO employees SET ?",
        {
            first_name: choice.firstname,
            last_name: choice.lastname,
            manager_id: managerId,
            role_id: roleId
        }, function(err) {
            if (err) throw err
            console.table(choice)
            startPrompt()
        }
        )
    })
}


// ADD EMPLOYEE ROLE
function addRole() { 
    inquirer.prompt([
        {
          name: "roletitle",
          type: "input",
          message: "What is the roles Title?"
        },
        {
          name: "rolesalary",
          type: "input",
          message: "What is the Salary?"
        },
        {
          name: "roledept",
          type: "list",
          message: "What is the Department?",
          choices: selectDept()
        } 
    ]).then(function(choice) {
      var deptId = selectDept().indexOf(choice.roledept) + 1
        connection.query(
            "INSERT INTO roles SET ?",
            {
              title: choice.roletitle,
              salary: choice.rolesalary,
              department_id: deptId
            },
            function(err) {
                if (err) throw err
                console.table(choice);
                startPrompt();
            }
        )
    });
}


// ADD DEPARTMENT
function addDept() { 

    inquirer.prompt([
        {
          name: "name",
          type: "input",
          message: "What Department would you like to add?"
        }
    ]).then(function(choice) {
        var query = connection.query(
            "INSERT INTO departments SET ? ",
            {
              name: choice.name

            },
            function(err) {
                if (err) throw err
                console.table(choice);
                startPrompt();
            }
        )
    })
  }
