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
    const { text, date } = req.body;

    const sql = "INSERT INTO todos (text, date) VALUES (?, ?)";
    connection.query(sql, [text, date], (err, result) => {
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
    const sql = `SELECT *  from todos;`;
    connection.query(sql, (err, results) => {
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

// app.get("/todo/:id", async (req, res) => {
//   try {
//     const { id } = req.params;
//     const data = await connection
//       .promise()
//       .query(`SELECT *  from todo where id = ?`, [id]);
//     res.status(200).json({
//       todo: data[0][0],
//     });
//   } catch (err) {
//     res.status(500).json({
//       message: err,
//     });
//   }
// });

// app.patch("/todo/:id", async (req, res) => {
//   try {
//     const { id } = req.params;
//     const { date, text, type } = req.body;
//     const update = await connection
//       .promise()
//       .query(`UPDATE users set date = ?, text = ?, type = ? where id = ?`, [
//         date,
//         text,
//         type,
//         id,
//       ]);
//     res.status(200).json({
//       message: "updated",
//     });
//   } catch (err) {
//     res.status(500).json({
//       message: err,
//     });
//   }
// });

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
