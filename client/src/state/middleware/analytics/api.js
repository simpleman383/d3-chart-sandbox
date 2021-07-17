import { actions, onApiRequest, onApiResponse } from "state/actions/analytics/api";

import { actions as httpActions } from "state/actions/core/http";
import { httpGetRequest } from "state/actions/core/http";


const middleware = ({ dispatch, getState }) => next => action => {
  next(action);


  if (action.type === httpActions.HTTP_SUCCESS) {
    const { payload, meta } = action;
    const { initiator } = meta;
    dispatch(onApiResponse(true, payload.response, initiator));
  }


  if (action.type === httpActions.HTTP_ERROR) {
    const { payload, meta } = action;
    const { initiator } = meta;
    dispatch(onApiResponse(false, payload.response, initiator));
  }


  if (action.type === httpActions.HTTP_EXCEPTION) {
    const { meta } = action;
    const { initiator } = meta;
    dispatch(onApiResponse(false, null, initiator));
  }


  if (action.type === actions.API_GET_STATIC_DATASET) {
    dispatch(onApiRequest(action.type));

    dispatch(httpGetRequest({
      url: "/dataset/static",
      options: {
        initiator: action.type
      }
    }));
  }

  if (action.type === actions.API_GET_RANDOM_DATASET) {
    dispatch(onApiRequest(action.type));

    const { size } = action.payload || {};
  
    dispatch(httpGetRequest({
      url: "/dataset/random",
      data: { size },
      options: {
        initiator: action.type
      }
    }));
  }
};

export default middleware;