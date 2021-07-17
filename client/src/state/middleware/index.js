import coreMiddleware from "./core";
import analyticsMiddleware from "./analytics";

const middleware = [
  ...coreMiddleware,
  ...analyticsMiddleware
];

export default middleware;