import { actions, addFilter } from "state/actions/analytics/filter";

const middleware = ({ dispatch, getState }) => next => (action) => {
  next(action);

  if (action.type === actions.FILTER_INPUT) {
    const { type, value } = action.payload;
    const { filters: existingFilters } = getState().analytics;

    const isFilterAlreadySet = Boolean(existingFilters.find(filter => filter.type === type));

    if (!isFilterAlreadySet) {
      dispatch(addFilter(type, value));
    }
  }

};

export default middleware;