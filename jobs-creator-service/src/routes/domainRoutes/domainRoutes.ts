import { Request, Response, Router } from "express";
import { validateSchema } from "../../systems/middlewares";
import {
  DomainBodySchemaType,
  domainBodySchema,
} from "./domainRoutes.interface";
import { addNewDomain } from "../../repositories/domain/domainRepositories";

const domainRouter = Router();

domainRouter.post(
  "/domain",
  validateSchema(domainBodySchema),
  async (req: Request<{}, {}, DomainBodySchemaType>, res: Response) => {
    try {
      const { domain } = req.body;

      const { addedDate, id, status } = await addNewDomain(domain);

      res.send({ addedDate, id, status, domain });
    } catch (err) {
      if (err instanceof Error) {
        if (err.message.includes("duplicate key error")) {
          res.status(400).json({ msg: "the domain already exists" });
        }

        res.status(500).json({ msg: err.message });
      }
    }
  }
);

export default domainRouter;
