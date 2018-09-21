import * as R from "ramda";
import React from "react";
import TaskNode from "./TaskNode";
import { TaskType } from "./types";
import { editNode } from "../../state/graph";

export default {
  contentType: TaskType,
  component: ({ content, ...props }) => <TaskNode task={content} {...props} />,
  create: ({ task }) => {
    if (!task) {
      throw new Error(`
A task must be a valid object of the form:

{
  id: string,
  name: string,
  inputs: [TaskInputType],
  outputs: [TaskOutputType],
  groups: [TaskInputGroup]
}

Got:

${task}
`);
    }
    return {
      content: task,
      inputs: task.inputs,
      outputs: task.outputs
    };
  },
  edit: ({ node, task }) => editNode(R.assoc("content", task, node))
  // invoke: when invoked, this task should emit an object containing the invokation of a task.
  // inference: this node should inform its output nodes what filenames will be generated on completetion.
  // postInference: this node has no post-inference action.
};
