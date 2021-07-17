import { actions as apiActions, fetchRandomDataset, fetchStaticDataset } from "state/actions/analytics/api";
import { actions, invalidateDataset, setData, changeDatasetSize, changeDatasetType } from "state/actions/analytics/data";
import { hideLoader, showLoader, showNotification } from "state/actions/core/layout";
import { actions as lifecycleActions } from "state/actions/core/lifecycle";
import { DatasetType } from "state/types/analytics";
import { Loader, Message, Notification } from "state/types/layout";
import { normalizeDataset } from "state/utils/analytics";


const middleware = ({ dispatch, getState }) => next => async (action) => {
  next(action);


  if (action.type === apiActions.API_REQUEST) {
    const { initiator } = action.meta;

    switch(initiator) {
      case apiActions.API_GET_STATIC_DATASET:
      case apiActions.API_GET_RANDOM_DATASET: {
        showLoader(Loader.Dataset);
        break;
      }
      default:
        break;
    }
  }


  if (action.type === apiActions.API_RESPONSE) {
    const { payload, meta } = action;
    const { initiator } = meta;

    switch(initiator) {
      case apiActions.API_GET_STATIC_DATASET:
      case apiActions.API_GET_RANDOM_DATASET: {
        const { success, response } = payload;

        if (success) {
          const dataNormalized = await normalizeDataset(response.data);
          dispatch(setData(dataNormalized));
          dispatch(hideLoader(Loader.Dataset));
        }
        else {
          dispatch(hideLoader(Loader.Dataset));
          dispatch(showNotification(Notification.Error, Message.DatasetFetchFailed));
        }

        break;
      }
      default:
        break;
    }
  }


  if (action.type === actions.INVALIDATE) {
    const state = getState().analytics;

    if (state.datasetType === DatasetType.Static) {
      dispatch(fetchStaticDataset());
    }
    else if (state.datasetType === DatasetType.Random) {
      const size = state.datasetSize;
      dispatch(fetchRandomDataset(size));
    }
    else {
      console.warn(`Unknown dataset type: ${state.dataset}`);
    }
  }


  if (action.type === actions.DATASET_TYPE_SELECT) {
    const state = getState().analytics;
    const { datasetType: nextDatasetType } = action.payload;

    if (nextDatasetType !== state.datasetType) {
      dispatch(changeDatasetType(nextDatasetType));
    }
  }


  if (action.type === actions.DATASET_SIZE_INPUT) {
    const state = getState().analytics;
    const { size: nextSize } = action.payload;

    if (nextSize !== state.datasetSize) {
      dispatch(changeDatasetSize(nextSize));
    }
  }


  if (action.type === lifecycleActions.APP_LOAD) {
    dispatch(invalidateDataset());
  }

  if (action.type === actions.DATASET_TYPE_CHANGE) {
    dispatch(invalidateDataset());
  }

  if (action.type === actions.RANDOM_DATASET_SIZE_CHANGE) {
    dispatch(invalidateDataset());
  }

};

export default middleware;