import sslChecker from "ssl-checker";
import {
  amqpHost,
  jobsCreatorQueue,
  virusTotalApi,
  virusTotalToken,
} from "../config";
import axios, { AxiosError } from "axios";
import whoiser from "whoiser";
import { DomainObjectInterface } from "../systems/interfaces";
import { sendDataToQueue } from "../systems/rmq";

const getSslDetails = async (domain: string) => {
  try {
    return await sslChecker(domain);
  } catch (err) {
    if (err instanceof Error) {
      console.error(err.message);
    }
  }
};

const getVirusTotalDataForDomain = async (domain: string) => {
  try {
    const apiToGet = `${virusTotalApi}${domain}`;

    const { data } = await axios.get(apiToGet, {
      headers: {
        "Content-Type": "application/json",
        "x-Apikey": virusTotalToken,
      },
    });

    return data;
  } catch (err) {
    if (err instanceof AxiosError) {
      console.error(err.message);
      console.error(err.toJSON());
    }
  }
};

const getWhoisData = async (domain: string) => {
  try {
    return await whoiser(domain);
  } catch (err) {
    if (err instanceof Error) {
      console.error(err.message);
    }
  }
};

export const getDataFromDomain = async (
  domainArr: Array<DomainObjectInterface>
) => {
  try {
    const domainData = await Promise.all(
      domainArr.map(async (domain) => {
        return {
          ...domain,
          sslData: await getSslDetails(domain.domain),
          whoisData: await getWhoisData(domain.domain),
          virusTotalData: await getVirusTotalDataForDomain(domain.domain),
          status: "done",
        };
      })
    );

    await sendDataToQueue({
      amqpHost,
      queueName: jobsCreatorQueue,
      msg: domainData,
    });
  } catch (err) {
    if (err instanceof Error) {
      console.error(err.message);
    }
  }
};
