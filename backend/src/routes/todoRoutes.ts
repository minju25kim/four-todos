import express from "express";
import connection from "../config/db.config";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const sql = `SELECT * FROM todos;`;
    connection.query(sql, (err, results) => {
      if (err) {
        console.error("Error inserting data into MySQL:", err);
        res.status(500).json({ error: "Internal server error" });
        return;
      }
      console.log("Fetched data from MySQL:", results);
      res.status(200).json(results);
    });
  } catch (err) {
    res.status(500).json({
      message: err,
    });
  }
});

router.get("/:type", async (req, res) => {
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
      res.status(200).json(results);
    });
  } catch (err) {
    res.status(500).json({
      message: err,
    });
  }
});

router.post("/", async (req, res) => {
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

router.put("/:id", async (req, res) => {
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

router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const sql = `DELETE FROM todos where id = ?`;
    connection.query(sql, [id], (err, results) => {
      if (err) {
        console.error("Error inserting data into MySQL:", err);
        res.status(500).json({ error: "Internal server error" });
        return;
      }
      console.log("Delete data from MySQL:", results);
      res.status(200).json({ todos: results });
    });
  } catch (err) {
    res.status(500).json({
      message: err,
    });
  }
});

export default router;
