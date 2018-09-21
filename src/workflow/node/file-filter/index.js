import * as R from "ramda";
import React from "react";
import FileFilterNode from "./FileFilterNode";
import { FileFilterType } from "./types";
import { editNode } from "../../state/graph";

export default {
  contentType: FileFilterType,
  component: ({ content, ...props }) => (
    <FileFilterNode filter={content} {...props} />
  ),
  create: ({ filter }) => ({
    content: filter || { selection: [] },
    inputs: [{ name: "files" }],
    outputs: [{ name: "filtered" }]
  }),
  edit: ({ node, filter }) => editNode(R.assoc("content", filter, node))
  // invoke: this node is not invoked.
  // inference: this node should inform its output nodes of the files it queries.
  // postInference: this node has no post-inference action.
};
