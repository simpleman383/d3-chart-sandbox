import { createAction } from "state/utils";

export const actions = {
  API_REQUEST: "[analytics/api]:API_REQUEST",
  API_RESPONSE: "[analytics/api]:API_RESPONSE",

  API_GET_STATIC_DATASET: "[analytics/api]:API_GET_STATIC_DATASET",
  API_GET_RANDOM_DATASET: "[analytics/api]:API_GET_RANDOM_DATASET",
};


export const onApiRequest = (initiator) => createAction({
  type: actions.API_REQUEST,
  meta: { initiator }
});

export const onApiResponse = (success, response, initiator) => createAction({
  type: actions.API_RESPONSE,
  payload: { success, response },
  meta: { initiator }
});

export const fetchStaticDataset = () => createAction({
  type: actions.API_GET_STATIC_DATASET
});

export const fetchRandomDataset = (datasetSize) => createAction({
  type: actions.API_GET_RANDOM_DATASET,
  payload: { size: datasetSize }
});
