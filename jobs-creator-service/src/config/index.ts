import dotenv from "dotenv";

dotenv.config();

export const port = process.env.JOB_SERVICE_PORT
  ? process.env.JOB_SERVICE_PORT
  : "5000";

export const mongoToken = process.env.DOCKER
  ? process.env.DOCKER_MONGO
  : process.env.MONGO_KEY;
