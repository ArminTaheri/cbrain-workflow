import * as R from "ramda";
import React from "react";
import PropTypes from "prop-types";
import OutputPinNode from "./OutputPinNode";
import { editNode } from "../../store/state/workflow";

export default {
  contentType: PropTypes.any,
  component: ({ content, ...props }) => (
    <OutputPinNode output={content} {...props} />
  ),
  create: ({ output }) => {
    return {
      content: output,
      inputs: [output],
      outputs: []
    };
  },
  edit: ({ node, task }) => editNode(R.assoc("content", task, node))
  // invoke: when invoked, this task should emit an object containing its invokation given its inputs.
  // inference: this node should inform its output nodes what filenames will be generated on completetion.
  // postInference: this node has no post-inference action.
};
