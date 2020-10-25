const connection = require("./connection");
const input = require("../user-interface");

class DB {
    constructor(connection) {
        this.connection = connection;
    }
}