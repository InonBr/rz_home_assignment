require("dotenv").config();

export const port = process.env.ANALYSIS_SERVICE_PORT
  ? process.env.ANALYSIS_SERVICE_PORT
  : "5001";

export const virusTotalToken = process.env.VIRUSTOTAL_TOKEN
  ? process.env.VIRUSTOTAL_TOKEN
  : "";

export const virusTotalApi = process.env.VIRUSTOTAL_API
  ? process.env.VIRUSTOTAL_API
  : "";

export const analysisQueue = process.env.ANALYSIS_QUEUE
  ? process.env.ANALYSIS_QUEUE
  : "analysis_service_queue";

export const amqpHost = process.env.AMQP_HOST ? process.env.AMQP_HOST : "";
