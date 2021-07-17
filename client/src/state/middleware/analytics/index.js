import apiMiddleware from "./api";
import dataMiddleware from "./data";

const middleware = [
  apiMiddleware,
  dataMiddleware
];

export default middleware;