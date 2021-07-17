import httpMiddleware from "./http";
import layoutMiddleware from "./layout";

const middleware = [
  layoutMiddleware,
  httpMiddleware
];

export default middleware;