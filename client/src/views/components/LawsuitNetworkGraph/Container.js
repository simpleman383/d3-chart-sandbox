import { connect } from "react-redux";
import ViewComponent from "./View";
import { lawsuitNetworkChartDataSelector } from "state/selectors/analytics";

import { Filter } from "state/types/analytics";
import { changeFilter } from "state/actions/analytics/filter";

const mapStateToProps = (state, props) => {
  return {
    data: lawsuitNetworkChartDataSelector(state, props)
  };
};

const mapDispatchToProps = dispatch => ({
  onNodeClick: (data) => {
    const companyId = data.id;
    dispatch(changeFilter(Filter.ByCompany, companyId));
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(ViewComponent);
