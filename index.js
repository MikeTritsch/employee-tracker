const inquirer = require('inquirer');
const logo = require('asciiart-logo');
const config = require('./package.json');
console.log(logo(config).render());
const mysql = require('mysql2/promise');
const db = require('./db');
require('mysql2/promise')

// Main Prompt
const initialPrompt = [
  {
    type: 'list',
    message: 'What would you like to do?',
    name: 'selection',
    choices: ['View All Employees', 'Add Employee', 'Update Employee Role', 'View All Roles', 'Add Role', 'View All Departments', 'Add Department', 'Quit']
  }
]

// Add Department Prompt
const addDepartmentPrompt = [
  {
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

    if (response.selection === 'Quit') {
      console.log('Goodbye!')
      process.exit(0);
    }

  })
};

// VIEW ALL EMPLOYEES
async function viewAllEmployees() {
  try {
    const employees = await db.findAllEmployees();
    console.table(employees);
  } catch (error) {
    console.error("Error while retrieving employees:", error);
  }
  init();
};

// ADD EMPLOYEE
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

  console.log('Employee added successfully!');
  init();
}

// UPDATE ROLE
async function updateEmployeeRole() {
  const employees = await db.findAllEmployees();
  const employeeChoices = employees.map(({ id, first_name, last_name }) => ({
    name: `${first_name} ${last_name}`,
    value: id,
  }));

  const roles = await db.findAllRoles();
  const roleChoices = roles.map(({ id, title }) => ({
    name: title,
    value: id,
  }));

  const employeeResponse = await inquirer.prompt({
    type: "list",
    name: "employeeId",
    message: "Which employee do you want to update?",
    choices: employeeChoices,
  });

  const roleResponse = await inquirer.prompt({
    type: "list",
    name: "roleId",
    message: "Which role do you want to assign to the selected employee?",
    choices: roleChoices,
  });

  const employeeId = employeeResponse.employeeId;
  const roleId = roleResponse.roleId;

  await db.updateEmployeeRole(employeeId, roleId);

  console.log('Employee role updated successfully!');
  init();
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

// ADD ROLE
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
    name: dept_name,
    value: id,
  }));

  const { departmentId } = await inquirer.prompt({
    type: "list",
    name: "departmentId",
    message: "What department is the role under?",
    choices: departmentChoices,
  });

  role.department_id = departmentId;

  await db.addRole(role);

  console.log('Role added successfully!');
  init();
}

// VIEW ALL DEPARTMENTS
async function viewAllDepartmentsFnct() {
  try {
    const departments = await db.findAllDepartments();
    console.table(departments);
  } catch (error) {
    console.error("Error while retrieving departments:", error);
  };
  init();
};

// ADD DEPARTMNENT
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