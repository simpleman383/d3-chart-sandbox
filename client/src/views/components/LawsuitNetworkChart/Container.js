import { connect } from "react-redux";
import ViewComponent from "./View";
import { lawsuitNetworkChartDataSelector } from "state/selectors/analytics";

const mapStateToProps = (state, props) => {
  return {
    data: lawsuitNetworkChartDataSelector(state, props)
  };
};

export default connect(mapStateToProps)(ViewComponent);
