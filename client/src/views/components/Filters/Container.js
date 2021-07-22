import { connect } from "react-redux";
import FiltersView from "./View";

import { removeFilter, resetFilters } from "state/actions/analytics/filter";
import { getLawsuitFilters } from "state/selectors/analytics";

const mapStateToProps = (state, props) => {
  return {
    filters: getLawsuitFilters(state)
  };
};

const mapDispatchToProps = dispatch => ({
  onRemoveFilter: (filterId) => dispatch(removeFilter(filterId)),
  onResetFilters: () => dispatch(resetFilters())
});

export default connect(mapStateToProps, mapDispatchToProps)(FiltersView);