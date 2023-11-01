const inquirer = require('inquirer');
const mysql = require('mysql2/promise');
const db = require('./db');
require('mysql2/promise')
// require('console.table');

// Main Prompt
const initialPrompt = [
  {
    type: 'list',
    message: 'What would you like to do?',
    name: 'selection',
    choices: ['View All Employees', 'Add Employee', 'Update Employee Role', 'View All Roles', 'Add Role', 'View All Departments', 'Add Department', 'Quit']
  }
]

// Add Employee Prompt
const addEmployeePrompt = [
  {
    type: 'input',
    message: 'What is the employee\'s first name?',
    name: 'firstName'
  },
  {
    type: 'input',
    message: 'What is the employee\'s last name?',
    name: 'lastName'
  },
  {
    type: 'list',
    message: 'What is the employee\'s role?',
    name: 'addEmployeeRole',
    choices: ['QA Manager', 'Front-End Developer', 'Director of Customer Relations', 'HR Director', 'Junior Developer', 'Chief People Officer']
  },
  {
    type: 'list',
    message: 'Who is the employee\'s manager?',
    name: 'managerEmployee',
    choices: ['Nathan Mackinnon', 'Cale Makar', 'Mikko Rantanen', 'None']
  }
]

// Update Employee Prompt
const updateEmployeeRolePrompt = [
  {
    type: 'list',
    message: 'Which employee\'s role do you want to update?',
    name: 'updateRole',
    choices: ['Nathan MacKinnon', 'Cale Makar', 'Mikko Rantanen', 'Jack Johnson', 'Josh Manson', 'Katie Gaus']
  },
  {
    type: 'list',
    message: 'Which role do you want to assign the select employee?',
    name: 'assignNewRole',
    choices: ['QA Manager', 'Front-End Developer', 'Director of Customer Relations', 'HR Coordinator', 'Project Manager', 'Back-End Developer']
  }
]

// Add Role Prompt
const addRolePrompt = [
  {
    type: 'input',
    message: 'What is the name of the role?',
    name: 'roleName'
  },
  {
    type: 'input',
    message: 'What is the salary of the role?',
    name: 'rolePay'
  },
  {
    type: 'list',
    message: 'What would you like to do?',
    name: 'deptSelect',
    choices: ['Engineering', 'Customer Service', 'Human Resources/HR'] // Will use thus (some sort of response.deptSelect push)
  }
]

// Add Department Prompt
const addDepartmentPrompt = [
  {
    type: 'input',
    message: 'What is the name if the department?',
    name: 'deptName'
  }
]

// MAIN FUNCTIONALITY
function init() {
  inquirer.prompt(initialPrompt)
  .then((response) => {

    if (response.selection === 'View All Employees') {
      viewAllEmployees();
    };

    if (response.selection === 'Add Employee') {
      addEmployeeFnct();
    };

    if (response.selection === 'Update Employee Role') {
      updateEmployeeRole();
    };

    if (response.selection === 'View All Roles') {
      viewAllRolesFnct();
    };

    if (response.selection === 'Add Role') {
      addRoleFnct();
    };

    if (response.selection === 'View All Departments') {
      viewAllDepartmentsFnct();
    };

    if (response.selection === 'Add Department') {
      addDepartmentFnct();
    };

  })
};

// INQUIRER FUNCTIONS
// function viewAllEmployees() {
//   console.log('View All Employees');
//   db.findAllEmployees()
//   .then(employees => {
//     console.table(employees);
//   })
//   .then(() => {
//     init();
//   })
// };

async function viewAllEmployees() {
  try {
    const employees = await db.findAllEmployees();
    console.table(employees);
  } catch (error) {
    console.error("Error while retrieving employees:", error);
  }
  init();
};


async function addEmployeeFnct() {
  const roles = await db.viewAllRoles();
  const employees = await db.findAllEmployees();
  await addEmployeePrompt
  console.log('Add Employee');
  inquirer.prompt(addEmployeePrompt)
  .then((response) => {
    console.log(response);
    init();
  })
};

function updateEmployeeRole() {
  console.log('Update Employee');
  inquirer.prompt(updateEmployeeRolePrompt)
  .then((response) => {
    console.log(response);
    init();
  });
};

function viewAllRolesFnct() {
  console.log('View All Roles');
  init();
};

function addRoleFnct() {
  console.log('Add Role');
  inquirer.prompt(addRolePrompt)
  .then((response) => {
    console.log(response);
    init();
  });
};

async function viewAllDepartmentsFnct() {
  try {
    const departments = await db.findAllDepartments();
    console.table(departments);
  } catch (error) {
    console.error("Error while retrieving employees:", error);
  };
  init();
};

function addDepartmentFnct() {
  console.log('View All Departments');
  inquirer.prompt(addDepartmentPrompt)
  .then((response) => {
    console.log(response);
    init();
  });
};

// APP START
init();