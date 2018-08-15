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

export const EMPTY_GRAPH: Graph = {
  name: "New Workflow",
  nodes: {},
  edges: {}
};

export const makeNodeID = (graph: Graph): NodeID => "0";

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
    startConnectionOutput$: Stream<{
      parentID: NodeID,
      outputIndex: number,
      offset: Point
    }>,
    endConnectionInput$: Stream<{
      childID: NodeID,
      inputIndex: number,
      offset: Point
    }>,
    startConnectionInput$: Stream<{
      childID: NodeID,
      inputIndex: number,
      offset: Point
    }>,
    endConnectionOutput$: Stream<{
      parentID: NodeID,
      outputIndex: number,
      offset: Point
    }>,
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
