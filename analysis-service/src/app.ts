import express, { Express } from "express";
import { port } from "./config";
import { getVirusTotalDataForDomain } from "../systems/virusTotalData";
import { getWhoisData } from "../systems/whoisData";
import { getSslDetails } from "../systems/sslData";
import { receiveMsgFromQueue } from "../../rmq-package/dist";

const app: Express = express();

receiveMsgFromQueue;

// getVirusTotalDataForDomain("google.com");
// getWhoisData("google.com");
// getSslDetails("google.com");

app.listen(port, () => {
  console.log(`🟢 App listening at http://localhost:${port}`);
});
