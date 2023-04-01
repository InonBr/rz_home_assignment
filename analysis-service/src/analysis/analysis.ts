import sslChecker from "ssl-checker";
import { virusTotalApi, virusTotalToken } from "../config";
import axios, { AxiosError } from "axios";
import whoiser from "whoiser";
import { DomainObjectInterface } from "../systems/interfaces";

const getSslDetails = async (domain: string) => {
  try {
    const x = await sslChecker("google.com");

    console.log(x);

    return x;
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
  const domainData = await Promise.all(
    domainArr.map(async (domain) => {
      console.log(domain.domain);
      console.log(domain.domain);
      console.log(domain.domain);

      const sslData = await getSslDetails(domain.domain);
      //   const whoisData = await getVirusTotalDataForDomain(domain.domain);
      //   const virusTotalData = await getWhoisData(domain.domain);

      return {
        ...domain,
        sslData,
        // whoisData,
        // virusTotalData,
        status: "done",
      };
    })
  );

  console.log(domainData);

  return domainData;
};
