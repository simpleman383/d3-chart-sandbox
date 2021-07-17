import { actions as httpActions, onHttpException, onHttpSuccess } from "state/actions/core/http";
import { httpClient } from "utils/http";

const middleware = ({ dispatch, getState }) => next => async action => {
  next(action);

  if (action.type === httpActions.HTTP_REQUEST) {
    const { payload, meta } = action;
    const { method, url, data } = payload;
    const { options } = meta;

    try {
      const response = await httpClient.request({
        method: method || "GET",
        url: url,
        params: method === "GET" ? data : null,
        data: method !== "GET" ? data : null
      });

      if (response.status === 200) {
        dispatch(onHttpSuccess(response, options));
      } 
      else {
        dispatch(onHttpError(response, options));
      }
    }
    catch (err) {
      console.error(err);
      dispatch(onHttpException(err, options));
    }
  }

};

export default middleware;