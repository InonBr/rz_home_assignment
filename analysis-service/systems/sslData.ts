import sslChecker from "ssl-checker";

export const getSslDetails = async (domain: string) => {
  try {
    const x = await sslChecker(domain);

    console.log(x);

    return x;
  } catch (err) {
    if (err instanceof Error) {
      console.error(err.message);
    }
  }
};
