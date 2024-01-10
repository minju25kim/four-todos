import mysql from "mysql2";

const connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "strongpw",
  database: "four_todos",
});

connection.connect((err) => {
  if (err) {
    console.error("Error connecting to MySQL:", err);
    return;
  }
  console.log("Connected to MySQL database");
});

export default connection;
