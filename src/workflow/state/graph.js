// @flow
import { Stream } from "most";
import * as most from "most";
import type {
  Point,
  Line,
  NodeID,
  GraphNode,
  ConnectionID,
  Connection,
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
    addNode$: Stream<GraphNode>,
    removeNode$: Stream<NodeID>,
    editNode$: Stream<{ id: NodeID, edit: GraphNode }>,
    addConnection$: Stream<Connection>,
    removeConnection$: Stream<ConnectionID>
  }
): { graph$: Stream<Graph> } => {
  const graph$ = most.of(initialGraph);
  return { graph$ };
};

export const editConnections = (
  graph$: Stream<Graph>,
  udpates: {
    startConnectionOutput$: Stream<{ parentID: NodeID, outputIndex: number }>,
    endConnectionInput$: Stream<{ childID: NodeID, inputIndex: number }>,
    startConnectionInput$: Stream<{ childID: NodeID, inputIndex: number }>,
    endConnectionOutput$: Stream<{ parentID: NodeID, outputIndex: number }>,
    continueConnection$: Stream<Point>
  }
): {
  addConnection$: Stream<Connection>,
  removeConnection$: Stream<ConnectionID>,
  drag$: Stream<Line | null>
} => {
  const addConnection$ = most.empty();
  const removeConnection$ = most.empty();
  const drag$ = most.empty();
  return { addConnection$, removeConnection$, drag$ };
};

export const moveNodes = (
  graph$: Stream<Graph>,
  udpates: {
    startMove$: Stream<NodeID>,
    endMove$: Stream<any>,
    continueMove: Stream<Point>
  }
): {
  editNode$: Stream<{ id: NodeID, edit: GraphNode }>
} => {
  const editNode$ = most.empty();
  return { editNode$ };
};
