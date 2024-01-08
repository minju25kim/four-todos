import express from "express";
import cors from "cors";
import { Temporal } from "@js-temporal/polyfill";

const app = express();
const port = 8080;

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

app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5173",
  })
);

app.get("/", (req, res) => {
  res.json({
    message: "this is backend server",
    time: Temporal.Now.plainDateTimeISO(),
  });
});

app.listen(port, () => {
  console.log(`Listening on port http://localhost:${port}...`);
});

app.post("/todo", async (req, res) => {
  try {
    const { text, date, type } = req.body;
    const sql = "INSERT INTO todos (text, date, type) VALUES (?, ?, ?)";
    connection.query(sql, [text, date, type], (err, result) => {
      if (err) {
        console.error("Error inserting data into MySQL:", err);
        res.status(500).json({ error: "Internal server error" });
        return;
      }
      console.log("Data inserted into MySQL:", result);
      res
        .status(200)
        .json({ message: "Data received and inserted successfully" });
    });
  } catch (err) {
    res.status(400).json({ error: err });
  }
});

app.get("/todo", async (req, res) => {
  try {
    const type = "sidepanel";
    const sql = `SELECT * FROM todos WHERE type = ?;`;
    connection.query(sql, [type], (err, results) => {
      if (err) {
        console.error("Error inserting data into MySQL:", err);
        res.status(500).json({ error: "Internal server error" });
        return;
      }
      console.log("Fetched data from MySQL:", results);
      res.status(200).json({ todos: results });
    });
  } catch (err) {
    res.status(400).json({ error: err });
  }
});

app.get("/todo/:type", async (req, res) => {
  try {
    const { type } = req.params;
    const sql = `SELECT * FROM todos WHERE type = ?;`;
    connection.query(sql, [type], (err, results) => {
      if (err) {
        console.error("Error inserting data into MySQL:", err);
        res.status(500).json({ error: "Internal server error" });
        return;
      }
      console.log("Fetched data from MySQL:", results);
      res.status(200).json({ todos: results });
    });
  } catch (err) {
    res.status(500).json({
      message: err,
    });
  }
});

app.put("/todo/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { type } = req.body;
    const sql = `UPDATE todos set type = ? where id = ?`;
    connection.query(sql, [type, id], (err, results) => {
      if (err) {
        console.error("Error inserting data into MySQL:", err);
        res.status(500).json({ error: "Internal server error" });
        return;
      }
      console.log("Update data from MySQL:", results);
      res.status(200).json({ todos: results });
    });
  } catch (err) {
    res.status(500).json({
      message: err,
    });
  }
});

// app.delete("/todo/:id", async (req, res) => {
//   try {
//     const { id } = req.params;
//     const update = await connection
//       .promise()
//       .query(`DELETE FROM todos where id = ?`, [id]);
//     res.status(200).json({
//       message: "deleted",
//     });
//   } catch (err) {
//     res.status(500).json({
//       message: err,
//     });
//   }
// });
