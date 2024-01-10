import express from "express";
import cors from "cors";
import { Temporal } from "@js-temporal/polyfill";
import connection from "./config/db.config";
import routes from "./routes";

const app = express();
const port = 8080;

app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5173",
  })
);

app.use("/", routes);

app.get("/", (req, res) => {
  res.json({
    message: "this is backend server",
    time: `Now is ${Temporal.Now.plainDateTimeISO()}`,
  });
});

app.listen(port, () => {
  console.log(`Listening on port http://localhost:${port}...`);
});
