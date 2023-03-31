import mongoose, { Types } from "mongoose";
import { IResolvedValues, VirusTotalDataInterface } from "../systems/ustils";
import { WhoisSearchResult } from "whoiser";

const DomainsModel = new mongoose.Schema({
  domain: {
    type: String,
    required: true,
    unique: true,
  },
  status: {
    type: "pending" || "processing" || "done",
    required: true,
  },
  sslData: {
    type: Types.DocumentArray<IResolvedValues>,
    required: false,
  },
  whoisData: {
    type: Types.DocumentArray<WhoisSearchResult>,
    required: false,
  },
  virusTotalData: {
    type: Types.DocumentArray<VirusTotalDataInterface>,
    required: false,
  },
  addedDate: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model("domainsData", DomainsModel);
