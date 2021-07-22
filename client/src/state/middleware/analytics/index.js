import apiMiddleware from "./api";
import dataMiddleware from "./data";
import filterMiddleware from "./filter";

const middleware = [
  apiMiddleware,
  dataMiddleware,
  filterMiddleware
];

export default middleware;