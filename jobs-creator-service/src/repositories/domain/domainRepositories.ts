import DomainsModel from "../../models/DomainsModel";
import { QueueObjectInterface } from "../../systems/utils";

export const addNewDomain = async (domain: string) => {
  const url = new URL(domain);
  const domainToAdd = url.hostname.replace("www.", "");

  const newDomain = new DomainsModel({
    domain: domainToAdd,
  });

  await newDomain.save();

  const { _id, addedDate, status } = newDomain;

  return { id: _id.toString(), addedDate, status };
};

export const findDomain = async (domain: string) =>
  await DomainsModel.findOne({
    domain,
  }).select("-__v");

export const findPendingDomains = async () =>
  await DomainsModel.find({ status: "pending" }).select("-__v");

export const updateDomainsData = async (domainData: QueueObjectInterface) => {
  const { _id, sslData, status, virusTotalData, whoisData } = domainData;
  await DomainsModel.findByIdAndUpdate(
    { _id },
    { sslData, status, virusTotalData, whoisData }
  );
};
