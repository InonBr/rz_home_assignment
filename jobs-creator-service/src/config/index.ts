import dotenv from "dotenv";

dotenv.config();

export const port = process.env.JOB_SERVICE_PORT
  ? process.env.JOB_SERVICE_PORT
  : "5000";

export const mongoToken = process.env.DOCKER
  ? process.env.DOCKER_MONGO
  : process.env.MONGO_KEY;

export const analysisQueue = process.env.ANALYSIS_QUEUE
  ? process.env.ANALYSIS_QUEUE
  : "analysis_service_queue";

export const amqpHost = process.env.AMQP_HOST ? process.env.AMQP_HOST : "";
