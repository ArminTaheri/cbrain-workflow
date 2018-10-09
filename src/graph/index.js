import * as R from "ramda";
import { makeID, createMap, createMapReducer } from "../map";

export const createGraph = (nodes, connections) => ({
  nodes: createMap(nodes),
  connections: createMap(connections)
});

export const createGraphReducer = (
  ADD_NODE,
  REMOVE_NODE,
  EDIT_NODE,
  ADD_CONNECTION,
  REMOVE_CONNECTION,
  EDIT_CONNECTION,
  PATCH_SUBRGAPH,
  initialGraph
) => {
  const nodesReducer = createMapReducer(ADD_NODE, REMOVE_NODE, EDIT_NODE);
  const connectionsReducer = createMapReducer(
    ADD_CONNECTION,
    REMOVE_CONNECTION,
    EDIT_CONNECTION
  );
  return (state = initialGraph || createGraph(), action) => {
    switch (action.type) {
      case REMOVE_NODE: {
        const id = action.payload;
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
      case PATCH_SUBRGAPH: {
        const subgraph = action.payload;
        const [nodeIndexToID, newNodes] = subgraph.nodes.reduce(
          ([indexMap, nodes], subNode, index) => {
            const id = makeID(nodes);
            const node = R.assoc("id", id, subNode);

            return [R.assoc(index, node, indexMap), R.assoc(id, node, nodes)];
          },
          [{}, state.nodes]
        );
        const newConnections = subgraph.connections.reduce(
          (connections, subConnection) => {
            const id = makeID(connections);
            const connection = {
              parentID: nodeIndexToID[subConnection.parentID].id,
              childID: nodeIndexToID[subConnection.childID].id,
              inputOffset: subConnection.inputOffset,
              outputOffset: subConnection.outputOffset
            };

            return R.assoc(id, R.assoc("id", id, connection), connections);
          },
          state.connections
        );
        const update = R.compose(
          R.assoc("nodes", newNodes),
          R.assoc("connections", newConnections)
        );

        return update(state);
      }
      default: {
        const { nodes, connections } = state;
        return {
          nodes: nodesReducer(nodes, action),
          connections: connectionsReducer(connections, action)
        };
      }
    }
  };
};
