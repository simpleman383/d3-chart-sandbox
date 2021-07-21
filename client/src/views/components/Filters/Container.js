import { connect } from "react-redux";
import FiltersView from "./View";

import { resetFilter } from "state/actions/analytics/filter";

const mapStateToProps = (state, props) => {
  return {
    filter: state.analytics.filter
  };
};

const mapDispatchToProps = dispatch => ({
  onResetFilter: () => {
    dispatch(resetFilter());
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(FiltersView);