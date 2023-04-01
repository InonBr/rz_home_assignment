import DomainsModel from "../../models/DomainsModel";

export const addNewDomain = async (domain: string) => {
  const newDomain = new DomainsModel({
    domain,
  });

  await newDomain.save();

  const { _id, addedDate, status } = newDomain;

  return { id: _id.toString(), addedDate, status };
};

export const findDomain = async (domain: string) =>
  await DomainsModel.findOne({
    domain,
  });

export const findPendingDomains = async () =>
  await DomainsModel.find({ status: "pending" });
