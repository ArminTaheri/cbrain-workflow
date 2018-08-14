// @flow
import { Stream } from "most";
import * as most from "most";
import type {
  Point,
  Line,
  NodeID,
  NodeParams,
  ConnectionID,
  ConnectionParams,
  Graph
} from "./types";

const EMPTY_GRAPH: Graph = {
  name: "",
  nodes: {},
  edges: {}
};

export const graphStream = (
  initialGraph: Graph = EMPTY_GRAPH,
  updates: {
    addNode$: Stream<NodeParams>,
    removeNode$: Stream<NodeID>,
    editNode$: Stream<{ id: NodeID, edit: NodeParams }>,
    addConnection$: Stream<ConnectionParams>,
    removeConnection$: Stream<ConnectionID>
  }
): Stream<Graph> => {
  const graph$ = most.of(initialGraph);
  return graph$;
};

export const editConnections = (
  graph$: Stream<Graph>,
  udpates: {
    startConnectionOutput$: Stream<{ parentID: NodeID, outputIndex: number }>,
    endConnectionInput$: Stream<{ nodeID: NodeID, inputIndex: number }>,
    startConnectionInput$: Stream<{ nodeID: NodeID, inputIndex: number }>,
    endConnectionOutput$: Stream<{ parentID: NodeID, outputIndex: number }>,
    continueConnection$: Stream<Point>
  }
): {
  addConnection$: Stream<ConnectionParams>,
  removeConnection$: Stream<ConnectionID>,
  drag$: Stream<Line | null>
} => {
  const addConnection$ = most.empty();
  const removeConnection$ = most.empty();
  const drag$ = most.empty();
  return { addConnection$, removeConnection$, drag$ };
};
