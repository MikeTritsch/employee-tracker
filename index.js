const inquirer = require('inquirer');

const initialPrompt = [
  {
    type: 'list',
    message: 'What would you like to do?',
    name: 'selection',
    choices: ['View All Employees', 'Add Employee', 'Update Employee Role', 'View All Roles', 'Add Role', 'View All Departments', 'Add Department', 'Quit']
  }
]



function init() {
  inquirer.prompt(initialPrompt)
  .then((response) => {

    if (response.selection === 'View All Employees') {
      viewAllEmployees();
    };

    if (response.selection === 'Add Employee') {
      addEmployee();
    };
  })
};

function viewAllEmployees() {
  console.log('View All Employees');
  init();
};

function addEmployee() {
  console.log('Add Employee');
  init();
}


init();