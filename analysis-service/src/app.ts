import express, { Express } from "express";
import { amqpHost, analysisQueue, port } from "./config";
import { receiveMsgFromQueue } from "./systems/rmq";
import { getDataFromDomain } from "./analysis/analysis";

const app: Express = express();

receiveMsgFromQueue({
  amqpHost,
  queueName: analysisQueue,
  // @ts-ignore
  analysisFunc: getDataFromDomain,
});

app.listen(port, () => {
  console.log(`🟢 App listening at http://localhost:${port}`);
});
