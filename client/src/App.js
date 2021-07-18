import React from "react";
import { connect, Provider } from "react-redux";
import { store } from "state/store";
import { onApplicationExit, onApplicationLoad } from "state/actions/core/lifecycle";

import { ApplicationLayout } from "views/components";
import "views/styles/main.scss";


const Main = connect()(({ dispatch }) => {

  React.useEffect(() => {
    dispatch(onApplicationLoad());

    return () => {
      dispatch(onApplicationExit());
    };
  }, []);

  return <ApplicationLayout />;
});



const App = () => {
  return (
    <Provider store={store}>
      <Main />
    </Provider>
  );
};

export default App;