const inquirer = require('inquirer');

const prompts = [
  {
    type: 'list',
    message: 'What would you like to do?',
    name: 'selection',
    choices: ['View All Employees', 'Add Employee', 'Update Employee Role', 'View All Roles', 'Add Role', 'View All Departments', 'Add Department', 'Quit']
  }
]

inquirer.prompt(prompts); // We will then take the response of this question and use it in our DB