// IMPORTS
const connection = require("./connection");

// DB CLASS CONSTRUCTOR
class DB {
  constructor(connection) {
    this.connection = connection;
  };

  // QUERIES RELATING TO INDEX FUNCTIONS
  findAllEmployees() {
    return this.connection.query("SELECT employee.id, employee.first_name, employee.last_name, role.title AS role_title, role.salary AS salary, CONCAT(manager.first_name, ' ', manager.last_name) AS manager, department.dept_name AS department_name FROM employee INNER JOIN role ON employee.role_id = role.id LEFT JOIN employee AS manager ON employee.manager_id = manager.id LEFT JOIN department ON role.department_id = department.id;");
  }

  addEmployee(employee) {
    return this.connection.query("INSERT INTO employee SET ?", employee)
  }

  findAllDepartments() {
    return this.connection.query("SELECT * FROM department");
  }

  findAllRoles() {
    return this.connection.query("SELECT id, title, salary FROM role");
  }

  addDepartment(department) {
    return this.connection.query("INSERT INTO department SET ?", department);
  }

  addRole(role) {
    return this.connection.query("INSERT INTO role SET ?", role);
  }

  updateEmployeeRole(employeeId, newRoleId) {
    return this.connection.query("UPDATE employee SET role_id = ? WHERE id = ?", [newRoleId, employeeId]);
  }
};

// EXPORTS
module.exports = new DB(connection);