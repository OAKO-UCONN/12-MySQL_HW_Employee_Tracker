const util = require("util");
const mysql = require("mysql");
const express = require("express");

const connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  // Your username
  user: "root",
  // Your password
  password: "T)UW%#T_$()qwr-a)jsrtg0-",
  database: "employees" //
});

connection.connect();

// Setting up connection.query to use promises instead of callbacks
// This allows us to use the async/await syntax
connection.query = util.promisify(connection.query);

module.exports = connection;
