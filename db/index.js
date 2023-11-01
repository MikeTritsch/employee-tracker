const connection = require("./connection");

class DB {
  constructor(connection) {
    this.connection = connection;
  };

findAllEmployees() {
  return this.connection.query("SELECT * FROM employee INNER JOIN role ON role.id = employee.id");
}

addEmployee(employee) {
  return this.connection.query("INSERT INTO employee SET ?", employee)
  // INSERT INTO, 
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