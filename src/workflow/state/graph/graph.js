import * as R from "ramda";
import { createAction } from "redux-actions";
import uuid from "uuid/v4";

export const EMPTY_GRAPH = () => ({
  name: "New Workflow",
  nodes: {},
  connections: {}
});

export const makeID = map => {
  let id;
  do {
    id = uuid();
  } while (map[id]);
  return id;
};

export const ADD_NODE = "ADD_NODE";
export const addNode = createAction(ADD_NODE);

export const REMOVE_NODE = "REMOVE_NODE";
export const removeNode = createAction(REMOVE_NODE);

export const EDIT_NODE = "EDIT_NODE";
export const editNode = createAction(EDIT_NODE);

export const ADD_CONNECTION = "ADD_CONNECTION";
export const addConnection = createAction(ADD_CONNECTION);

export const REMOVE_CONNECTION = "REMOVE_CONNECTION";
export const removeConnection = createAction(REMOVE_CONNECTION);

export const graphReducer = (state = EMPTY_GRAPH(), action) => {
  if (!action.payload) {
    return state;
  }
  switch (action.type) {
    case ADD_NODE: {
      const id = makeID(state.nodes);
      const node = R.assoc("id", id, action.payload);

      return R.assocPath(["nodes", id], node, state);
    }
    case REMOVE_NODE: {
      const { id } = action.payload;
      const removeConnections = R.pipe(
        R.toPairs,
        R.reject(
          R.compose(
            R.either(R.whereEq({ parentID: id }), R.whereEq({ childID: id })),
            R.nth(1)
          )
        ),
        R.fromPairs
      );
      const update = R.compose(
        R.over(R.lensProp("connections"), removeConnections),
        R.over(R.lensProp("nodes"), R.dissoc(id))
      );

      return update(state);
    }
    case EDIT_NODE: {
      const { node } = action.payload;
      const { id } = node;

      return R.assocPath(["nodes", id], node, state);
    }
    case ADD_CONNECTION: {
      const id = makeID(state.connections);
      const connection = R.assoc("id", id, action.payload);

      return R.over(R.lensProp("connections"), R.assoc(id, connection), state);
    }
    case REMOVE_CONNECTION: {
      const id = action.payload;

      return R.over(R.lensProp("connections"), R.dissoc(id), state);
    }
    default: {
      return state;
    }
  }
};
