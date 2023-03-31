import { Request, Response, Router } from "express";
import { validateSchema } from "../../systems/middlewares";
import {
  DomainBodySchemaType,
  domainBodySchema,
} from "./domainRoutes.interface";

const domainRouter = Router();

domainRouter.post(
  "/domain",
  validateSchema(domainBodySchema),
  async (req: Request<{}, {}, DomainBodySchemaType>, res: Response) => {
    const { domain } = req.body;

    console.log(domain);

    res.send(domain);
  }
);

export default domainRouter;
