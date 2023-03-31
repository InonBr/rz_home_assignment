import { InferType, object, string } from "yup";

export const domainBodySchema = object({
  domain: string()
    .matches(
      /^https?:\/\/(www\.)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/i
    )
    .required("Domain is required")
    .url("Domain must be a valid URL"),
}).required();

export type DomainBodySchemaType = InferType<typeof domainBodySchema>;
