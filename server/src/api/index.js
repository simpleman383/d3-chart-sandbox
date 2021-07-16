import express from "express";
import { setupRouter as setupDatasetApi } from "api/dataset";

export const setupApi = (services) => {
  const router = express.Router();

  router.use("/dataset", setupDatasetApi(services));
  return router;
};