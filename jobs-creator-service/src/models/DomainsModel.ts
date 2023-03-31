import mongoose, { Types } from "mongoose";

const DomainsModel = new mongoose.Schema({
  domain: {
    type: String,
    required: true,
    unique: true,
  },
  status: {
    type: String,
    enum: ["pending", "done"],
    required: true,
    default: "pending",
  },
  sslData: {
    type: Object,
    required: false,
  },
  whoisData: {
    type: Object,
    required: false,
  },
  virusTotalData: {
    type: Object,
    required: false,
  },
  addedDate: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model("domainsData", DomainsModel);
