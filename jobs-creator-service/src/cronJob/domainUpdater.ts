import { updateDomainsData } from "../repositories/domain/domainRepositories";
import { QueueObjectInterface } from "../systems/utils";

export const updateDomainsByQueue = async (
  domainsArr: QueueObjectInterface[]
) => {
  try {
    await Promise.all(
      domainsArr.map((domain) => {
        updateDomainsData(domain);
      })
    );
  } catch (err) {
    if (err instanceof Error) {
      console.error(err);
    }
  }
};
