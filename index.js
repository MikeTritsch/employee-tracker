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
    name: 'first_name'
  },
  {
    type: 'input',
    message: 'What is the employee\'s last name?',
    name: 'last_name'
  },
  {
    type: 'list',
    message: 'What is the employee\'s role?',
    name: 'role_id',
    choices: ['QA Manager', 'Front-End Developer', 'Director of Customer Relations', 'HR Coordinator', 'Project Manager', 'Back-End Developer']
  },
  {
    type: 'list',
    message: 'Who is the employee\'s manager?',
    name: 'manager_id',
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
    name: 'title'
  },
  {
    type: 'input',
    message: 'What is the salary of the role?',
    name: 'salary'
  },
  {
    type: 'list',
    message: 'What department is the role under?',
    name: 'department_id',
    choices: ['Engineering', 'Customer Service', 'Human Resources/HR', 'Legal', 'Sales']
  }
]

// Add Department Prompt
const addDepartmentPrompt = [
  {
    // type: 'input',
    message: 'What is the name of the department?',
    name: 'dept_name'
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
  const roles = await db.findAllRoles();
  const employees = await db.findAllEmployees();

  const employee = await inquirer.prompt([
    {
      name: "first_name",
      message: "What is the employee's first name?",
    },
    {
      name: "last_name",
      message: "What is the employee's last name?",
    },
  ]);

  const roleChoices = roles.map(({ id, title }) => ({
    name: title,
    value: id,
  }));

  const { roleId } = await inquirer.prompt({
    type: "list",
    name: "roleId",
    message: "What is the employee's role?",
    choices: roleChoices,
  });

  employee.role_id = roleId;

  const managerChoices = employees.map(({ id, first_name, last_name }) => ({
    name: `${first_name} ${last_name}`,
    value: id,
  }));

  managerChoices.unshift({ name: "None", value: null });

  const { managerId } = await inquirer.prompt({
    type: "list",
    name: "managerId",
    message: "Who is the employee's manager?",
    choices: managerChoices,
  });

  employee.manager_id = managerId;

  await db.addEmployee(employee);

  init();
}

function updateEmployeeRole() {
  console.log('Update Employee');
  inquirer.prompt(updateEmployeeRolePrompt)
  .then((response) => {
    console.log(response);
    init();
  });
};

async function viewAllRolesFnct() {
  try {
    const roles = await db.findAllRoles();
    console.table(roles);
  } catch (error) {
    console.error("Error while retrieving roles:", error)
  };
  init();
};

async function addRoleFnct() {
  const departments = await db.findAllDepartments();
  const roles = await db.findAllRoles();

  const role = await inquirer.prompt([
    {
      name: "title",
      message: "What is the role title?",
    },
    {
      name: "salary",
      message: "What is the salary of the role?",
    },
  ]);

  const departmentChoices = departments.map(({ id, dept_name }) => ({
    name: dept_name, // Assuming department names are stored in 'dept_name'
    value: id,
  }));

  const { departmentId } = await inquirer.prompt({
    type: "list",
    name: "departmentId", // Change 'roleId' to 'departmentId' for clarity
    message: "What department is the role under?",
    choices: departmentChoices,
  });

  role.department_id = departmentId; // Correctly set the 'department_id' property

  await db.addRole(role);

  init();
}

async function viewAllDepartmentsFnct() {
  try {
    const departments = await db.findAllDepartments();
    console.table(departments);
  } catch (error) {
    console.error("Error while retrieving departments:", error);
  };
  init();
};

async function addDepartmentFnct() {
  try {
    const dept_name = await inquirer.prompt(addDepartmentPrompt);
    await db.addDepartment(dept_name);
    console.log('Department Added!');
  } catch (error) {
    console.error("Error while adding department:", error);
  };
    init();
};
// APP START
init();