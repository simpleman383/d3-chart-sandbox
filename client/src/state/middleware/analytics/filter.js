import { actions, addFilter, updateFilter } from "state/actions/analytics/filter";
import { Filter } from "state/types/analytics";

const middleware = ({ dispatch, getState }) => next => (action) => {
  next(action);

  if (action.type === actions.FILTER_INPUT) {
    const { type, value } = action.payload;
    const { filters: existingFilters } = getState().analytics;

    const existingFilter = existingFilters.find(filter => filter.type === type);
    const isFilterAlreadySet = Boolean(existingFilter);

    if (!isFilterAlreadySet) {
      dispatch(addFilter(type, value));
    }
    else {
      if (type === Filter.ByCompany && value !== existingFilter.value) {
        dispatch(updateFilter(existingFilter.id, type, value));
      }
    }

  }

};

export default middleware;