//Dependencies
const connection = require("./db/connection");
const mysql = require("mysql");
var express = require("express");
const inquirer = require("inquirer");
//const cTable = require("console.table");
//const { response } = require("express");
const util = require("util");
//var { Queries } = require('./db/queries');
var queries = require('./db/queries');
//import Cat from './cat.js';
//import Queries from "/db/queries";

//Initialize
function start() {
    inquirer.prompt({
        type: "list",
        name: "init",
        message: "What would you like to do?",
        choices: ["View All Employees", "View All Departments", "View All Roles", "View All Employees By Department", "View All Employees By Manager",
          "Add Employee", "Remove Employee", "Update Employee Role", "Add Employee Role", "Remove Role", "Add New Department", "Remove Department"]
      })
      .then(function (response) {
        switch (response.init) {
  
          case "View All Employees":
            displayEmployees();
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

//{}[]()_START_FUNCTIONS

//  addEmployeee Function
var addEmployee = function(){
    inquirer.prompt([{
        name:"first_name",
        type:"input",
        message:"What is the first name of the employee?"
    },{
        name:"last_name",
        type:"input",
        message:"What is the last name of the employee?"
    },{
        name:"department",
        type:"input",
        message:"What department would you like to place the employee in?"
    },{
        name:"salary",
        type:"input",
        message:"What would you like their salary to be?"
    },{
        name:"role",
        type:"input",
        message:"What would you like their role to be?",
        /*
        validate: function(value){
            if(isNaN(value)==false){
                return true;
            } else {
                return false;
            }
        }
        */
    }]).then(function(answer){
        connection.query("INSERT INTO employee SET ?", {
            first_name:answer.first_name,
            last_name:answer.first_name,
            department:answer.department,
            salary:answer.salary,
            role:answer.role,
        },function(err,res){
            console.log(answer);
            console.log("Your employee was added successfully!");
            start();
        })
    })
}

///*
start();
//*/

//