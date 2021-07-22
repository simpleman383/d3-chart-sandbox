import { actions as dataActions } from "state/actions/analytics/data";
import { actions as filterActions } from "state/actions/analytics/filter";  
import { DatasetType } from "state/types/analytics";

const defaultState = {
  data: null,
  datasetType: DatasetType.Static,
  datasetSize: 100,
  filters: []
};

export default (state = defaultState, action) => {
  switch (action.type) {

    case filterActions.FILTER_RESET: {
      return {
        ...state,
        filters: defaultState.filters
      };
    }

    case filterActions.FILTER_ADD: {
      return {
        ...state,
        filters: [ 
          ...state.filters, 
          {
            id: action.payload.id,
            type: action.payload.type,
            value: action.payload.value     
          }
        ]
      };
    }

    case filterActions.FILTER_REMOVE: {
      return {
        ...state,
        filters: state.filters.filter(item => item.id !== action.payload.id)
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
