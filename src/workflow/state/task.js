// @flow
import { Stream } from "most";
import * as most from "most";

import type { Point, Task, TaskNode, GraphNode, Graph } from "./types";

export const makeTaskNode = (
  graph: Graph,
  task: Task,
  position: Point
): TaskNode => ({
  position,
  type: "TASK",
  content: task,
  inputSize: task.inputs.length,
  outputSize: task.inputs.length
});

export const placeTaskNodes = (
  graph$: Stream<Graph>,
  placeNode$: Stream<{ position: Position, task: ?Task }>
): { addNode$: Stream<GraphNode> } => {
  const addNode$ = most.empty();
  return { addNode$ };
};
