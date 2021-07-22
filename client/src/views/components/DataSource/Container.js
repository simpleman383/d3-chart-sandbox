import { connect } from "react-redux";
import DataSourcePresets from "./View";
import { getDatasetType, getDatasetSize, getDataSourceOptions } from "state/selectors/analytics";
import { selectDatasetType, inputDatasetSize } from "state/actions/analytics/data";

const mapStateToProps = (state) => {
  return {
    currentDataSource: getDatasetType(state),
    dataSourceOptions: getDataSourceOptions(state),
    randomDatasetSize: getDatasetSize(state)
  };
};

const mapDispatchToProps = dispatch => ({
  onDataSourceChange: nextSource => dispatch(selectDatasetType(nextSource)),
  onDatasetSizeChange: nextSize => dispatch(inputDatasetSize(nextSize))
});

export default connect(mapStateToProps, mapDispatchToProps)(DataSourcePresets);