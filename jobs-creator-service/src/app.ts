import express, { Express } from "express";
import { port } from "./config";
import connectDB from "./systems/dBConnection";

const app: Express = express();

app.use(express.json());

connectDB().then(() => {
  console.log("🔵 MongoDB connected...");
  app.listen(port, () => {
    console.log(`🟢 App listening at http://localhost:${port}`);
  });
});
