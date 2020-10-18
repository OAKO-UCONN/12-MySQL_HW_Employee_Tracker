const { prompt } = require("inquirer");
const db = require("./db");
require("console.table");

//Run the program

//Main Prompts Function
loadMainPrompts();
async function loadMainPrompts() {
  const { choice } = await prompt([
    {
      type: "list",
      name: "choice",
      message: "What would you like to do?",
      choices: [
        {
          name: "View All Employees",
          value: "VIEW_EMPLOYEES",
        },
        {
          name: "View Employees by Department",
          value: "VIEW_EMPLOYEES_BY_DEPARTMENT",
        },
        {
          name: "Create a New Employee",
          value: "CREATE_NEW_EMPLOYEE",
        },
        {
          name: "Remove Employee With a Given ID",
          value: "REMOVE_EMPLOYEE_ID",
        },
        {
          name: "Update the given employee's role",
          value: "NEW_EMPLOYEE_ROLE",
        },
        {
          name: "Update the given employee's manager",
          value: "UPDATE_EMPLOYEE_MANGER",
        },
        {
          //   name: "View All Employees",
          //   value: "VIEW_EMPLOYEES"
          // },
          // {
          //   name: "View All Employees",
          //   value: "VIEW_EMPLOYEES"
        },
        {
          name: "Quit",
          value: "QUIT",
        },
      ],
    },
  ]);
  // Call the appropriate function depending on what the user chose
  switch (choice) {
    case "VIEW_EMPLOYEES":
      return viewEmployees();
    case "VIEW_EMPLOYEES_BY_DEPARTMENT":
      return viewEmployeesByDepartment();
    case "CREATE_NEW_EMPLOYEE":
      return createNewEmployee(employee);
    case "REMOVE_EMPLOYEE_ID":
      return createNewEmployee();
    case "NEW_EMPLOYEE_ROLE":
      return createNewEmployee();
    case "UPDATE_EMPLOYEE_MANGER":
      return createNewEmployee();
    //..other functions
    //..
    //..
    //..
    default:
      return quit();
  }
}
//View All Employees Function
async function viewEmployees() {
  const employees = await db.findAllEmployees();
  console.log("\n");
  console.table(employees);
  loadMainPrompts();
}
//Create New Employee Function
async function createNewEmployee() {
  const employee = await db.createNewEmployee();
  const employeeInfo = employee.map(({ id, firstName, LastName }) => ({
    value: id,
    firstName: employee.firstName,
    LastName: employee.LastName,
  }));
  console.log("\n");
  console.table(employees);
  loadMainPrompts();
}
//View Employees By Department
async function viewEmployeesByDepartment() {
  const departments = await db.findAllDepartments();
  const departmentChoices = departments.map(({ id, name }) => ({
    name: name,
    value: id,
  }));
  const { departmentId } = await prompt([
    {
      type: "list",
      name: "departmentId",
      message: "Which department would you like to see employees for?",
      choices: departmentChoices,
    },
  ]);
  const employees = await db.findAllEmployeesByDepartment(departmentId);
  console.log("\n");
  console.table(employees);
  loadMainPrompts();
}
function quit() {
  console.log("Goodbye!");
  process.exit();
}

