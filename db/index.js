const connection = require("./connection");
const input = require("../index");


class DB {
  // Keeping a reference to the connection on the class in case we need it later
  constructor(connection) {
    this.connection = connection;
  }

// ########################################### CREATE #############################################################
 
  // Create a new employee
  createNewEmployee(employee) {
    return this.connection.query(
      "INSERT INTO employee SET ?" +employee
    );
  }
 
  // Create a new department
  createDepartment(department) {
    return this.connection.query("INSERT INTO department SET ?", department);
  }

  // Create a new role
  createRole(role) {
    return this.connection.query("INSERT INTO role SET ?", role);
  }


//////////////////////////////////////////////////////////END CREATES/////////////////////////////////////////////////////////////

//################################################# READ #################################################################

  // Find all employees, join with roles and departments to display their roles, salaries, departments, and managers
  findAllEmployees(employees) {
    return this.connection.query(
      `SELECT employee.id, employee.first_name, employee.last_name, 
      role.title, department.name AS department, role.salary, 
      CONCAT(manager.first_name, ' ', 
      manager.last_name) AS manager FROM employee LEFT JOIN role on employee.role_id = role.id 
      LEFT JOIN department on role.department_id = department.id LEFT JOIN employee manager on manager.id = employee.manager_id;`,
      employees
    );
  }

  // Find all employees except the given employee id
  findAllPossibleManagers(employeeId) {
    //TODO: complete the function
  }

   // Find all departments, join with employees and roles and sum up utilized department budget
   findAllDepartments(alldepartments) {
    return this.connection.query(
      `SELECT department.id, department.name, 
      SUM(role.salary) AS utilized_budget FROM employee LEFT JOIN role on employee.role_id = role.id 
      LEFT JOIN department on role.department_id = department.id GROUP BY department.id, 
      department.name;`,
      alldepartments
    );
  }

    // Find all roles, join with departments to display the department name
    findAllRoles(roles) {
      return this.connection.query(
        "SELECT role.id, role.title, department.name AS department, role.salary FROM role LEFT JOIN department on role.department_id = department.id;",
        roles
      );
    }

    // Find all departments, join with employees and roles and sum up utilized department budget
    findAllDepartments(departments) {
      return this.connection.query(
        "SELECT department.name, department.id FROM department LEFT JOIN role on role.department_id = department.id ;",
        departments
      );
    }

  // Find all employees in a given department, join with roles to display role titles
  findAllEmployeesByDepartment(departmentId) {
    return this.connection.query(
      `SELECT employee.id, employee.first_name, employee.last_name, 
      role.title FROM employee LEFT JOIN role on employee.role_id = role.id LEFT JOIN department department on role.department_id = department.id WHERE department.id = ?;`,
      departmentId
    );
  }

  // Find all employees by manager, join with departments and roles to display titles and department names



  

////////////////////////////////////////////////////////////////////////////////////END READS//////////////////////////////////////////////////////////////////////////////

//################################################################################## UPDATE ###############################################################################
// Update the given employee's role

updateEmployeeRole() {
  return this.connection.query(
    "UPDATE employee SET role_id = ? WHERE id = ?", [roleId, employeeId]
  );
}

/* old
updateEmployeeRole() {
  return this.connection.query(
    "UPDATE FROM employee employee.id employee.role"
  );
}
*/

// Update the given employee's manager
updateEmployeesManager() {
  return this.connection.query(
    "UPDATE FROM employee employee.manager"
  );
}
//////////////////////////////////////////////////////////////////////////////////////END UPDATES////////////////////////////////////////////////////////////////////////////////

//###################################################################################### DELETE ##############################################################################

  // Remove an employee with the given id
  removeEmployeeById() {
    return this.connection.query(
      "DELETE FROM employee WHERE id = ?", employeeId
    );
  }

  // Remove a department
  deleteDepartment(department) {
    //return this.connection.query("REMOVE FROM department SET ?", department);
    return this.connection.query("DELETE FROM department WHERE id = ?", department);
  }

  // Remove a role from the db
  removeRole(roleId) {
    return this.connection.query("DELETE FROM role WHERE id = ?", roleId);
  }

////////////////////////////////////////////////////////////////////////////////////////END DELETES//////////////////////////////////////////////////////////////////////////////

 
}

module.exports = new DB(connection);
