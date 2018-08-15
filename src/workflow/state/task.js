// @flow
import { Stream } from "most";

import type { Point, Task, TaskNode, Graph } from "./types";

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
