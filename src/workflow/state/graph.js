// @flow
import { Stream } from "most";
import * as most from "most";

export type Point = { x: number, y: number };
export type Line = { start: Point, end: Point };
export type Graph = {};
export type NodeID = String;
export type Node = {};
export type Connection = {};
export type ConnectionID = String;

const EMPTY_GRAPH: Graph = {};

export const graphStream = (
  initialGraph: Graph = EMPTY_GRAPH,
  updates: {
    $addNode: Stream<Node>,
    $removeNode: Stream<NodeID>,
    $editNode: Stream<{ id: NodeID, node: Node }>,
    $addConnection: Stream<Connection>,
    $removeConnection: Stream<ConnectionID>
  }
): Stream<Graph> => {
  const $graph = most.of(initialGraph);
  return $graph;
};

export const editConnections = (
  graph$: Stream<Graph>,
  udpates: {
    $startConnectionOutput: Stream<{ parentID: NodeID, outputIndex: number }>,
    $endConnectionInput: Stream<{ nodeID: NodeID, inputIndex: number }>,
    $startConnectionInput: Stream<{ nodeID: NodeID, inputIndex: number }>,
    $endConnectionOutput: Stream<{ parentID: NodeID, outputIndex: number }>,
    $continueConnection: Stream<Point>
  }
): {
  $addConnection: Stream<Connection>,
  $removeConnection: Stream<ConnectionID>,
  $drag: Stream<Line>
} => {
  const $addConnection = most.empty();
  const $removeConnection = most.empty();
  const $drag = most.empty();
  return { $addConnection, $removeConnection, $drag };
};
