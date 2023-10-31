const connection = require('./connections');
function findAllEmployees() {
  return connection.query("SELECT * FROM employee");
};

module.export = { findAllEmployees };