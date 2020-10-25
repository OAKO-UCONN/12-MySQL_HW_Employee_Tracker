const connection = require("./connection");
const input = require("../user-interface");

class Queries {

//CRUD OPERATIONS |||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||

//CREATE++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

// + // Create a new employee and insert into the SQL Database.
insertNewEmployee() {
    return `INSERT INTO employee (first_name, last_name, role_id, manager_id)
    VALUES (?, ?, ?, ?);`
}


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

// ~



//UPDATE^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

//DESTORY---------------------------------------------------------------------------------------------------------------------------------------



// END CRUD OPERATIONS |||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||











}//END Wrapper XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
//
module.exports = Queries;