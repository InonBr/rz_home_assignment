import { schedule } from "node-cron";
import { findPendingDomains } from "../repositories/domain/domainRepositories";
import { sendDataToQueue } from "../systems/rmq";
import { amqpHost, analysisQueue } from "../config";

export const cronJob = () => {
  return new Promise((resolve, reject) => {
    schedule("*/1 * * * *", async () => {
      try {
        const pendingDomains = await findPendingDomains();

        if (pendingDomains.length) {
          sendDataToQueue({
            queueName: analysisQueue,
            msg: pendingDomains,
            amqpHost,
          });
        }
      } catch (err: any) {
        console.log(err);
        reject(new Error(err));
      }
    });
  });
};
