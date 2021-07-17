export const createAction = ({ type, payload, meta } = {}) => {
  const actionType = type || "[core/action]:UNKNOWN_ACTION";
  const actionPayload = payload || {};
  const actionMeta = meta || {};

  return {
    type: actionType,
    payload: actionPayload,
    meta: actionMeta
  };
};