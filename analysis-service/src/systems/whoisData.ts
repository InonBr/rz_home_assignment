import whoiser from "whoiser";

export const getWhoisData = async (domain: string) => {
  try {
    return await whoiser(domain);
  } catch (err) {
    if (err instanceof Error) {
      console.error(err.message);
    }
  }
};
