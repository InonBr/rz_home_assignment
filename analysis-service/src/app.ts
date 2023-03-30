import express, { Express } from "express";
import { port } from "./config";

const app: Express = express();

app.listen(port, () => {
  console.log(`🟢 App listening at http://localhost:${port}`);
});
