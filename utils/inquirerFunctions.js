// VIEW ALL DEPARTMENTS
function viewAllDept() {
    connection.query("SELECT departments.id AS Dept_ID, departments.name AS Department_Name FROM departments;",  
    function(err, res) {
      if (err) throw err
      console.table(res)
  })
}

// VIEW ALL ROLES
function viewAllRoles() {
    connection.query("SELECT roles.id AS Role_ID, roles.title As Job_Title, roles.salary as Salary, departments.name AS Department FROM roles INNER JOIN departments on departments.id = roles.department_id;",  
    function(err, res) {
      if (err) throw err
      console.table(res)
  })
}

// VIEW ALL EMPLOYEES
function viewAllEmployees() {
    connection.query("SELECT employees.id AS ID, employees.first_name AS First_Name, employees.last_name AS Last_Name, roles.title AS Job_Title, roles.salary as Salary, departments.name as Department, CONCAT(e.first_name, ' ' ,e.last_name) AS Manager FROM employees INNER JOIN roles on roles.id = employees.role_id INNER JOIN departments on departments.id = roles.department_id LEFT JOIN employees e on employees.manager_id = e.id;",  
    function(err, res) {
      if (err) throw err
      console.table(res)
  })
}

module.exports = {
    viewAllDept,
    viewAllRoles, 
    viewAllEmployees
}