import { virusTotalApi, virusTotalToken } from "../src/config";
import axios, { AxiosError } from "axios";

export const getVirusTotalDataForDomain = async (domain: string) => {
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
