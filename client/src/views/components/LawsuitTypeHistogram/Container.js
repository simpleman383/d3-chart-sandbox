import { connect } from "react-redux";
import ViewComponent from "./View";
import { lawsuitHistogramDataSelector } from "state/selectors/analytics";

import { Filter } from "state/types/analytics";
import { changeFilter } from "state/actions/analytics/filter";

const mapStateToProps = (state, props) => {
  return {
    data: lawsuitHistogramDataSelector(state, props)
  };
};

const mapDispatchToProps = dispatch => ({
  onBarClick: (event, target) => {
    dispatch(changeFilter(Filter.ByLawsuitType, target.key));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(ViewComponent);