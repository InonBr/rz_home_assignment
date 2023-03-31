import { virusTotalApi, virusTotalToken } from "../config";
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

    console.log(data);

    return data;
  } catch (err) {
    if (err instanceof AxiosError) {
      console.error(err.message);
      console.error(err.toJSON());
    }
  }
};
