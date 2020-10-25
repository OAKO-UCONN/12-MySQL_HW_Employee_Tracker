//Dependencies
const connection = require("./connection");
const mysql = require("mysql");
const express = require("express");
const inquirer = require("inquirer");
const cTable = require("console.table");
const { response } = require("express");
const util = require("util");
//var { Queries } = require('./db/queries');
var queries = require('./db/queries');
//import Cat from './cat.js';
//import Queries from "/db/queries";

//Initialize
function start() {
    inquirer.prompt({
        type: "list",
        name: "start",
        message: "What would you like to do?",
        choices: ["View All Employees", "View All Departments", "View All Roles", "View All Employees By Department", "View All Employees By Manager",
          "Add Employee", "Remove Employee", "Update Employee Role", "Add Employee Role", "Remove Role", "Add New Department", "Remove Department"]
      })
        .then(function (response) {
          switch (response.start) {
    
            case "View All Employees":
              viewAllEmployees();
              break;
    
            case "View All Departments":
              viewDepartments();
              break;
    
            case "View All Roles":
              viewRoles();
              break;
    
            case "View All Employees By Department":
              displayEmByDep();
              break;
    
            case "View All Employees By Manager":
              displayEmByManager();
              break;
    
            case "Add Employee":
              addEmployee();
              break;
    
            case "Remove Employee":
              removeEmployee();
              break;
    
            case "Update Employee Role":
              updateEmpRole();
              break;
    
            case "Add Employee Role":
              addRole();
              break;
    
            case "Remove Role":
              removeRole();
              break;
    
            case "Add New Department":
              addDepartment();
              break;
    
            case "Remove Department":
              removeDept();
              break;
    
            case "Update Employee Manager":
              updateEmpManager();
              break;
          }
        })
    };