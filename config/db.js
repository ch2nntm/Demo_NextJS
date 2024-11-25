// const mysql = require("mysql");
import mysql from "mysql";

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "testdbnextjs",
});

db.connect((err) => {
  if (err) {
    console.error("Error connecting to MYSQL database: ", err);
  } else {
    console.log("Connected to MYSQL databse");
  }
});

module.exports = db;
