import express from "express";
import { query, validationResult } from "express-validator";

export const setupRouter = (services) => {
  const { DatasetService } = services;

  const router = express.Router();

  router.get("/static", async (request, response) => {
    try {
      const data = await DatasetService.fetchStatic();
      response.status(200);
      response.json(data);
    }
    catch (err) {
      console.error(err);
      response.status(500);
      return;
    }
  });

  
  router.get(
    "/random", 
    query("size").isNumeric(),
    query("size").toInt(),
    query("size").custom((value) => {
      if (value <= 0) {
        throw new Error('Size should be greater than 0');
      }
      else {
        return true;
      }
    }),
    async (request, response) => {
      const errors = validationResult(request);

      if (!errors.isEmpty()) {
        response.status(400);
        return;
      }

      try {
        const data = await DatasetService.generateRandom(request.query.size);
        response.status(200);
        response.json(data);
      }
      catch (err) {
        console.error(err);
        response.status(500);
        return;
      }
    }
  );


  return router;
};

