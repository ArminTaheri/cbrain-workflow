import * as R from "ramda";
import React from "react";
import PropTypes from "prop-types";
import WorkflowNode from "./WorkflowNode";
import { editNode } from "../../store/state/workflow";

export default {
  contentType: PropTypes.any,
  component: ({ content, ...props }) => (
    <WorkflowNode workflow={content} {...props} />
  ),
  create: ({ workflow }) => {
    return {
      content: workflow,
      inputs: R.values(workflow.graph.nodes)
        .filter(node => node.type === "INPUT_PIN")
        .map(node => node.content),
      outputs: R.values(workflow.graph.nodes)
        .filter(node => node.type === "OUTPUT_PIN")
        .map(node => node.content)
    };
  },
  edit: ({ node, task }) => editNode(R.assoc("content", task, node))
  // invoke: when invoked, this task should emit an object containing its invokation given its inputs.
  // inference: this node should inform its output nodes what filenames will be generated on completetion.
  // postInference: this node has no post-inference action.
};
