import { actions } from "state/actions/core/layout";

const defaultState = {
  loaders: [],
};

export default (state = defaultState, action) => {
  switch (action.type) {
    
    case actions.LOADER_SHOW: {
      return {
        ...state,
        loaders: [ ...state.loaders, action.payload.loader ]
      };
    }

    case actions.LOADER_HIDE: {
      return {
        ...state,
        loaders: state.loaders.filter(item => item !== action.payload.id)
      };
    }

    default:
      return state;
  }
};