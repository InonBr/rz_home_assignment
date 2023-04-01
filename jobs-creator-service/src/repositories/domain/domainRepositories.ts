import DomainsModel from "../../models/DomainsModel";

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
