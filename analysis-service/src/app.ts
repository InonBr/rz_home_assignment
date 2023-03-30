import express, { Express } from "express";
import { port } from "./config";
import { getVirusTotalDataForDomain } from "../systems/virusTotalData";
import { getWhoisData } from "../systems/whoisData";

const app: Express = express();

getVirusTotalDataForDomain("google.com");
getWhoisData("google.com");

app.listen(port, () => {
  console.log(`🟢 App listening at http://localhost:${port}`);
});
