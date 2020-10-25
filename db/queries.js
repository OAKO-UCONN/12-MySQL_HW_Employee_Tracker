//Dependencies
const connection = require("./connection");//DB Connection Information
const input = require("../user-interface");//Inquierer
//END Dependencies

//START EXPORTING so we can use these functions with Inquirer. \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
class Queries {

//CRUD OPERATIONS |||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||
// +CREATE ~READ ^UPDATE -DESTROY //;

//CREATE++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

// + // Create a new employee and insert into the SQL Database.
insertNewEmployee() {
    return `INSERT INTO employee (first_name, last_name, role_id, manager_id)
    VALUES (?, ?, ?, ?);`
};

// + // Allows to skip adding a department for an employee.
insertOrIgnoreDepartment() {
    return `INSERT IGNORE INTO department (name)
    VALUES (?)`;
};

// + // Allows to skip adding a role for an employee.
insertOrIgnoreRole() {
    return `INSERT IGNORE INTO role (title, salary, department_id)
    VALUES (?, ?, ?)`;
};



//READ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

// ~ // View ALL Employees
viewAllEmployees() {
    return `SELECT employee.id, employee.first_name, employee.last_name, role.title, dept.name AS department, 
    role.salary, CONCAT(manager.first_name, ' ', manager.last_name) AS manager FROM employee 
    LEFT JOIN role on employee.role_id = role.id 
    LEFT JOIN department dept on role.department_id = dept.id 
    LEFT JOIN employee manager on manager.id = employee.manager_id`;
};

// ~ // View ALL Employees BY DEPARTMENT
viewAllEmployeesByDept() {
    return `SELECT employee.id, employee.first_name, employee.last_name, role.title, dept.name AS department, 
    role.salary, CONCAT(manager.first_name, ' ', manager.last_name) AS manager FROM employee 
    LEFT JOIN role on employee.role_id = role.id 
    LEFT JOIN department dept on role.department_id = dept.id 
    LEFT JOIN employee manager on manager.id = employee.manager_id
    WHERE dept.name = ?`;
};

// ~ // View ALL Employees BY ROLE
viewAllEmployeesByRole() {
    return `SELECT employee.id, employee.first_name, employee.last_name, role.title, dept.name AS department, 
    role.salary, CONCAT(manager.first_name, ' ', manager.last_name) AS manager FROM employee 
    LEFT JOIN role on employee.role_id = role.id 
    LEFT JOIN department dept on role.department_id = dept.id 
    LEFT JOIN employee manager on manager.id = employee.manager_id
    WHERE role.title = ?`;
};

// ~ // View ALL Employees BY NAME
viewAllEmployeeNames() {
    return `SELECT CONCAT(employee.first_name, ' ', employee.last_name) AS employee_name FROM employee;`;
};

// ~ // View ALL MANAGERS
viewAllManagers() {
    return `SELECT DISTINCT employee.manager_id AS manager_id, CONCAT(manager.first_name, ' ', manager.last_name) AS manager FROM employee 
    LEFT JOIN employee manager on manager.id = employee.manager_id
    WHERE employee.manager_id IS NOT NULL`;
};

// ~ // View ALL Employees BY MANAGER
viewAllEmployeesByManager() {
    return ` SELECT employee.id, employee.first_name, employee.last_name, role.title, dept.name AS department, 
    role.salary, CONCAT(manager.first_name, ' ', manager.last_name) AS manager FROM employee 
    LEFT JOIN role on employee.role_id = role.id 
    LEFT JOIN department dept on role.department_id = dept.id 
    LEFT JOIN employee manager on manager.id = employee.manager_id
    WHERE manager.first_name = ? AND manager.last_name = ?`;
};

// ~ // View the employee's ID number by their name.
viewEmployeeIdByName() {
    return `SELECT employee.id FROM employee WHERE employee.first_name = ? AND employee.last_name = ?`;
};

// ~ // View the Managers ID number using their name.
viewManagerIdByName() {
    return `SELECT employee.id AS manager_id FROM employee WHERE employee.first_name = ? AND employee.last_name = ?`;
};

// ~ // View the Departments ID on the DataBase from it's name.
viewDeptIdByName() {
    return `SELECT department.id FROM department WHERE department.name = ?`;
};

// ~ // View the role ID from the database by it's name.
viewRoleIdByName() {
    return `SELECT role.id FROM role WHERE role.title = ?`;
};

// ~ // View the Role by department id.
viewRoleIdByDeptId() {
    return `SELECT id FROM role WHERE department_id = ?`;
};

// ~ // View Department ID Using its name.
viewDepartmentIdByName() {
    return `SELECT department.id FROM department WHERE department.name = ?`;
};


//UPDATE^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

// ^ // Assign the Department ID to a Role.
assignDeptIdToRole() {
    return `UPDATE role SET department_id = ? WHERE role.title = ?`;
};

// ^ // Update the Department Role when department removed.
updateDeptRoleUnderRemovedDept() {
    return `UPDATE role SET department_id = null WHERE role.id = ?`;
};

// ^ // Update Employee role Id if Role name removed.
updateEmployeeRoleIdUnderRemovedRole() {
    return `UPDATE employee SET employee.role_id = null WHERE employee.role_id = ?`;
};

// ^ // Update Employees if Manager removed.
updateEmployeesUnderRemovedManager() {
    return `UPDATE employee SET employee.manager_id = null WHERE employee.manager_id = ?`;
};

// ^ // Update Employee Role ID
updateEmployeeRoleId() {
    return `UPDATE employee SET employee.role_id = ? WHERE employee.id = ?`;
};

// ^ // Update Employee Manager using the ID.
updateEmployeeManagerById() {
    return `UPDATE employee SET employee.manager_id = ? WHERE employee.id = ?`;
};


//DESTORY---------------------------------------------------------------------------------------------------------------------------------------

// - // Remove or fire an employee by their id.
removeEmployeeById() {
    return `DELETE FROM employee WHERE employee.id = ?`;
};

// - // Remove a department using the ID.
removeDepartmentById() {
    return `DELETE FROM department WHERE department.id = ?`;
};

// - // Remove a role using the ID.
removeRoleById() {
    return `DELETE FROM role WHERE role.id = ?`;
};


// END CRUD OPERATIONS |||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||
//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\
}//END Wrapper XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
//  EXPORTs this Module.
module.exports = Queries;