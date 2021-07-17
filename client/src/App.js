import React from "react";
import { connect, Provider } from "react-redux";
import { store } from "state/store";

import { onApplicationExit, onApplicationLoad } from "state/actions/core/lifecycle";
import { DatasetType } from "state/types/analytics";
import { selectDatasetType } from "state/actions/analytics/data";


const mapStateToProps = state => ({
  data: state.analytics.data
});

const Main = connect(mapStateToProps)(({ data, dispatch }) => {

  React.useEffect(() => {
    dispatch(onApplicationLoad());

    return () => {
      dispatch(onApplicationExit());
    };
  }, []);


  const onUpdateClick = (datasetType) => {
    switch (datasetType) {
      case DatasetType.Static:
      case DatasetType.Random:
        dispatch(selectDatasetType(datasetType));
        break;
      default:
        break;
    }
  };

  return (
    <main>
      <div>
        <button onClick={() => onUpdateClick(DatasetType.Static)}>Update with static</button>
        <button onClick={() => onUpdateClick(DatasetType.Random)}>Update with random</button>
      </div>
      <div>
        {JSON.stringify(data)}
      </div>
    </main>
  );
});



const App = () => {
  return (
    <Provider store={store}>
      <Main />
    </Provider>
  );
};

export default App;