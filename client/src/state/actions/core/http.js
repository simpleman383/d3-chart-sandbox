import { createAction } from "state/utils";

export const actions = {
  HTTP_REQUEST: "[core/http]:HTTP_REQUEST",
  HTTP_SUCCESS: "[core/http]:HTTP_SUCCESS",
  HTTP_ERROR: "[core/http]:HTTP_ERROR",
  HTTP_EXCEPTION: "[core/http]:HTTP_EXCEPTION",
};

export const httpRequest = ({ url, method, data, options }) => createAction({
  type: actions.HTTP_REQUEST,
  payload: { method, url, data },
  meta: { options }
});

export const httpGetRequest = ({ url, data, options }) => httpRequest({ method: "GET", url, data, options });
export const httpPostRequest = ({ url, data, options }) => httpRequest({ method: "POST", url, data, options });

export const onHttpSuccess = (response, requestOptions) => createAction({
  type: actions.HTTP_SUCCESS,
  payload: { response },
  meta: requestOptions
});

export const onHttpError = (response, requestOptions) => createAction({
  type: actions.HTTP_ERROR,
  payload: { response },
  meta: requestOptions
});

export const onHttpException = (error, requestOptions) => createAction({
  type: actions.HTTP_EXCEPTION,
  payload: { error },
  meta: requestOptions
});