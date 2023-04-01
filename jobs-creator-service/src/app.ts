import express, { Express } from "express";
import { port } from "./config";
import connectDB from "./systems/dBConnection";
import domainRouter from "./routes/domainRoutes/domainRoutes";
import { cronJob } from "./cronJob/cronJob";

const app: Express = express();

app.use(express.json());

app.use("/api", domainRouter);

cronJob().catch((err: Error) => {
  console.error(err);
});

connectDB().then(() => {
  console.log("🔵 MongoDB connected...");
  app.listen(port, () => {
    console.log(`🟢 App listening at http://localhost:${port}`);
  });
});
