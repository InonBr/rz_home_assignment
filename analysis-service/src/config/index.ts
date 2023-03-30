require("dotenv").config();

export const port = process.env.ANALYSIS_SERVICE_PORT
  ? process.env.ANALYSIS_SERVICE_PORT
  : "5001";
