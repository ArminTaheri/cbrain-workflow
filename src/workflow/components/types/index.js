import PropTypes from "prop-types";

export const PointType = PropTypes.shape({
  x: PropTypes.number,
  y: PropTypes.number
});

export const LineType = PropTypes.shape({
  start: PointType,
  end: PointType
});

export const FileInfoType = PropTypes.shape({
  id: PropTypes.string,
  name: PropTypes.string
});

export const FileSourceType = PropTypes.shape({
  // Query function that closes over a lookup of some files.
  query: PropTypes.func
});

export const FileFilterType = PropTypes.shape({
  selection: PropTypes.arrayOf(FileInfoType)
});

export const InputType = PropTypes.shape({
  // Add relevant keys from boutiques schema for inputs
});

export const OutputType = PropTypes.shape({
  // Add relevant keys from boutiques schema for outputs
});

export const InputGroup = PropTypes.shape({
  // Add relevant keys from boutiques schema for input groups
});

export const TaskType = PropTypes.shape({
  name: PropTypes.string,
  inputs: PropTypes.arrayOf(InputType),
  outputs: PropTypes.arrayOf(OutputType),
  groups: PropTypes.arrayOf(InputGroup)
});

export const NODE_TYPE = {
  SOURCE: "FILE_SOURCE",
  FILE_FILTER: "FILE_FILTER",
  TASK: "TASK",
  // To be implemented in phase 2:
  WORKFLOW_NODE: "WORKFLOW_NODE",
  MAP_LIST_NODE: "MAP_LIST_NODE",
  PARAMETERS_NODE: "PARAMETERS_NODE",
  INPUT_TRANSFORM_NODE: "INPUT_TRANSFORM_NODE"
};

export const NodeOptionType = PropTypes.oneOf([
  NODE_TYPE.SOURCE,
  NODE_TYPE.FILE_FILTER,
  NODE_TYPE.TASK
]);

export const NodeIDType = PropTypes.string;

export const NodeType = PropTypes.shape({
  position: PointType,
  type: NodeOptionType,
  content: PropTypes.oneOfType([FileSourceType, FileFilterType, TaskType])
});

export const ConnectionIDType = PropTypes.string;

export const ConnectionType = PropTypes.shape({
  parentID: NodeIDType,
  childID: NodeIDType,
  inputIndex: PropTypes.number,
  outputIndex: PropTypes.number
});

export const GraphType = PropTypes.shape({
  name: PropTypes.string,
  nodes: PropTypes.objectOf(
    // Keys should be the ID of a node.
    // Values should be a NodeType.
    NodeType
  ),
  edges: PropTypes.objectOf(
    // Keys should be a connection ID
    // Values should be a ConnectionType
    ConnectionType
  )
});
