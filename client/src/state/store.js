import { applyMiddleware, combineReducers, createStore } from "redux";
import reducers from "state/reducers";
import middleware from "state/middleware";

export const store = createStore(
  combineReducers(reducers),
  applyMiddleware(...middleware)
);