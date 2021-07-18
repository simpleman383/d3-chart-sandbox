import { connect } from "react-redux";
import ViewComponent from "./View";
import { lawsuitHistogramDataSelector } from "state/selectors/analytics"

const mapStateToProps = (state, props) => {
  return {
    data: lawsuitHistogramDataSelector(state, props)
  };
};

export default connect(mapStateToProps)(ViewComponent);