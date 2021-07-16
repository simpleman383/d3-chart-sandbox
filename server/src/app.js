import express from "express";
import { json as jsonBodyParser } from "body-parser";
import cors from "cors";
import path from "path";
import { setupServices } from "service";
import { setupApi } from "api";


export const initializeServer = ({ services: servicesConfiguration, publicPath, port = 3000 }) => {

  const application = express();

  if (!servicesConfiguration) {
    throw new Error("Malformed server configuration. Please check config object or file.");
  }

  const applicationServices = setupServices(servicesConfiguration);
  const apiRouter = setupApi(applicationServices);

  if (process.env.NODE_ENV !== "production") {
    application.use(cors());
  }

  application
    .use(jsonBodyParser())
    .use("/api", apiRouter);   
    
  if (process.env.NODE_ENV === "production") {
    application.use("/", express.static(path.resolve(publicPath)));
  }

  return {
    run: () => new Promise((res, rej) => {
      try {
        application.listen(port, () => res(true));
      }
      catch (err) {
        rej(err);
      }
    })
  };
}