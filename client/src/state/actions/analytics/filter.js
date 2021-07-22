import { createAction } from "state/utils";
import { generateKey } from "utils/entity";

export const actions = {
  FILTER_CHANGE: "[analytics/filter]:FILTER_CHANGE",
  FILTER_RESET: "[analytics/filter]:FILTER_RESET",
  FILTER_INPUT: "[analytics/filter]:FILTER_INPUT",
  FILTER_ADD: "[analytics/filter]:FILTER_ADD",
  FILTER_REMOVE: "[analytics/filter]:FILTER_REMOVE"
};

export const changeFilter = (filterType, filterValue) => createAction({
  type: actions.FILTER_CHANGE,
  payload: { type: filterType, value: filterValue }
});

export const resetFilter = () => createAction({ type: actions.FILTER_RESET });

export const inputFilter = (filterType, filterValue) => createAction({
  type: actions.FILTER_INPUT,
  payload: { type: filterType, value: filterValue }
});

export const addFilter = (filterType, filterValue) => createAction({
  type: actions.FILTER_ADD,
  payload: {  id: generateKey(), type: filterType, value: filterValue }
});

export const removeFilter = (filterId) => createAction({
  type: actions.FILTER_REMOVE,
  payload: { id: filterId }
});