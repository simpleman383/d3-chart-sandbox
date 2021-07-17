import { createAction } from "state/utils";

export const actions = {
  DATASET_TYPE_SELECT: "[analytics/data]:DATASET_TYPE_SELECT",
  DATASET_TYPE_CHANGE: "[analytics/data]:DATASET_TYPE_CHANGE",

  DATASET_SIZE_INPUT: "[analytics/data]:DATASET_TYPE_INPUT",
  DATASET_SIZE_CHANGE: "[analytics/data]:DATASET_SIZE_CHANGE",

  INVALIDATE: "[analytics/data]:INVALIDATE",
  DATASET_SET: "[analytics/data]:DATASET_SET",
};

export const invalidateDataset = () => createAction({ type: actions.INVALIDATE });

export const changeDatasetType = (nextType) => createAction({
  type: actions.DATASET_TYPE_CHANGE,
  payload: { datasetType: nextType }
});

export const selectDatasetType = (nextType) => createAction({
  type: actions.DATASET_TYPE_SELECT,
  payload: { datasetType: nextType }
});

export const inputDatasetSize = (nextSize) => createAction({
  type: actions.DATASET_SIZE_INPUT,
  payload: { size: nextSize }
});

export const changeDatasetSize = (nextSize) => createAction({
  type: actions.DATASET_SIZE_CHANGE,
  payload: { size: nextSize }
});

export const setData = (data) => createAction({
  type: actions.DATASET_SET,
  payload: { data }
});