import { actions as dataActions } from "state/actions/analytics/data";
import { actions as filterActions } from "state/actions/analytics/filter";  
import { DatasetType } from "state/types/analytics";

const defaultState = {
  data: null,
  datasetType: DatasetType.Static,
  datasetSize: 100,
  filter: null
};

export default (state = defaultState, action) => {
  switch (action.type) {

    case filterActions.FILTER_CHANGE: {
      return {
        ...state,
        filter: {
          type: action.payload.type,
          value: action.payload.value
        }
      };
    }

    case filterActions.FILTER_CHANGE: {
      return {
        ...state,
        filter: defaultState.filter
      };
    }
    
    case dataActions.DATASET_TYPE_CHANGE: {
      return {
        ...state,
        datasetType: action.payload.datasetType
      };
    }

    case dataActions.DATASET_SIZE_CHANGE: {
      return {
        ...state,
        datasetSize: action.payload.size
      };
    }

    case dataActions.DATASET_SET: {
      return {
        ...state,
        data: action.payload.data
      };
    }

    default:
      return state;
  }
};
