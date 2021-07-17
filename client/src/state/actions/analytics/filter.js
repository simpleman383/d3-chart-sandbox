import { createAction } from "state/utils";

export const actions = {
  FILTER_CHANGE: "[analytics/filter]:FILTER_CHANGE",
  FILTER_RESET: "[analytics/filter]:FILTER_RESET"
};

export const changeFilter = (filterType, filterValue) => createAction({
  type: actions.FILTER_CHANGE,
  payload: { type: filterType, value: filterValue }
});

export const resetFilter = () => createAction({ type: actions.FILTER_RESET });