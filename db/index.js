const connection = require("./connection");

class DB {
  constructor(connection) {
    this.connection = connection;
  };

findAllEmployees() {
  return this.connection.query("SELECT employee.id, employee.first_name, employee.last_name, role.title AS role_title, role.salary AS salary, CONCAT(manager.first_name, ' ', manager.last_name) AS manager, department.dept_name AS department_name FROM employee INNER JOIN role ON employee.role_id = role.id LEFT JOIN employee AS manager ON employee.manager_id = manager.id LEFT JOIN department ON role.department_id = department.id;");
}

addEmployee(employee) {
  return this.connection.query("INSERT INTO employee SET ?", employee)
  // INSERT INTO, 
}

findAllDepartments() {
  return this.connection.query("SELECT * FROM department");
}



// function findAllEmployees() {
//   return new Promise((resolve, reject) => {
//     // Implement the database query to retrieve all employees
//     connection.query("SELECT * FROM employee", (err, results) => {
//       if (err) {
//         reject(err);
//       } else {
//         resolve(results);
//       }
//     });
//   });
// }










};

module.exports = new DB(connection);
// module.exports = { findAllEmployees };