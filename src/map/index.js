import * as R from "ramda";
import makeID from "./makeID";

export { makeID };

export const createMap = (pairs = {}) =>
  pairs instanceof Array ? R.fromPairs(pairs) : pairs;

export const createMapReducer = (ADD, REMOVE, UPDATE, initialMap) => (
  state = initialMap || createMap(),
  action
) => {
  switch (action.type) {
    case ADD: {
      const id = makeID(state);
      const element = R.assoc("id", id, action.payload);

      return R.assoc(id, element, state);
    }
    case REMOVE: {
      const id = action.payload;
      return R.dissoc(id, state);
    }
    case UPDATE: {
      const element = action.payload;
      const { id } = element;

      if (!R.isNil(id)) {
        return R.assoc(id, element, state);
      }

      return state;
    }
    default: {
      return state;
    }
  }
};
