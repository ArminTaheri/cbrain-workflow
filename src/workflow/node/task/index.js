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
      throw new Error(
        `
A task must be a valid Boutiques descriptor.  

Got:

${task}
`
      );
    }
    return {
      content: task,
      inputs: task["inputs"].filter(
        input => input.type.toLowerCase() === "file"
      ),
      outputs: task["output-files"]
    };
  },
  edit: ({ node, task }) => editNode(R.assoc("content", task, node))
  // invoke: when invoked, this task should emit an object containing its invokation given its inputs.
  // inference: this node should inform its output nodes what filenames will be generated on completetion.
  // postInference: this node has no post-inference action.
};
