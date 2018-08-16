// @flow
import { Stream } from "most";
import * as most from "most";

import type {
  Point,
  FileSource,
  FileSourceNode,
  FileFilter,
  FileFilterNode,
  GraphNode,
  Graph
} from "./types";

export const makeFileSourceNode = (
  graph: Graph,
  position: Point,
  source: FileSource
): FileSourceNode => ({
  position,
  type: "FILE_SOURCE",
  content: source,
  inputSize: 0,
  outputSize: 1
});

export const makeFileFilterNode = (
  graph: Graph,
  position: Point,
  filter: FileFilter = { selection: [] }
): FileFilterNode => ({
  position,
  type: "FILE_FILTER",
  content: filter,
  inputSize: 1,
  outputSize: 1
});

export const placeFileFilterNodes = (
  graph$: Stream<Graph>,
  placeNode$: Stream<{ position: Position, filter: ?FileFilter }>
): { addNode$: Stream<GraphNode> } => {
  const addNode$ = most.empty();
  return { addNode$ };
};
