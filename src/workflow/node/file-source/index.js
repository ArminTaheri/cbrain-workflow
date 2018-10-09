import * as R from "ramda";
import React from "react";
import FileSourceNode from "./FileSourceNode";
import { FileSourceType } from "./types";
import { editNode } from "../../store/state/workflow";

export default {
  contentType: FileSourceType,
  component: ({ content, ...props }) => (
    <FileSourceNode source={content} {...props} />
  ),
  create: ({ source }) => ({
    content: source || { query: null },
    inputs: [],
    outputs: [{ name: "files" }]
  }),
  edit: ({ node, source }) => editNode(R.assoc("content", source, node))
  // invoke: this node is not invoked.
  // inference: this node should inform its output nodes of the files it filters.
  // postInference: this node has no post-inference action.
};
