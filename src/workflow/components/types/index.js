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

export const TaskInputType = PropTypes.shape({
  // Add relevant keys from boutiques schema for inputs
});

export const TaskOutputType = PropTypes.shape({
  // Add relevant keys from boutiques schema for outputs
});

export const TaskInputGroup = PropTypes.shape({
  // Add relevant keys from boutiques schema for input groups
});

export const TaskType = PropTypes.shape({
  name: PropTypes.string,
  inputs: PropTypes.arrayOf(TaskInputType),
  outputs: PropTypes.arrayOf(TaskOutputType),
  groups: PropTypes.arrayOf(TaskInputGroup)
});

export const NODE_TYPE = {
  FILE_SOURCE: "FILE_SOURCE",
  FILE_FILTER: "FILE_FILTER",
  TASK: "TASK",
  // To be implemented in phase 2:
  WORKFLOW: "WORKFLOW",
  MAP_LIST: "MAP_LIST",
  PARAMETERS: "PARAMETERS",
  INPUT_TRANSFORM: "INPUT_TRANSFORM"
};

export const NodeOptionType = PropTypes.oneOf([
  NODE_TYPE.FILE_SOURCE,
  NODE_TYPE.FILE_FILTER,
  NODE_TYPE.TASK
]);

export const NodeIDType = PropTypes.string;

export const NodeInputType = PropTypes.shape({
  name: PropTypes.string
});

export const NodeOutputType = PropTypes.shape({
  name: PropTypes.string
});

export const NodeType = PropTypes.shape({
  id: NodeIDType,
  position: PointType,
  type: NodeOptionType,
  content: PropTypes.oneOfType([FileSourceType, FileFilterType, TaskType]),
  inputs: PropTypes.arrayOf(NodeInputType),
  outputs: PropTypes.arrayOf(NodeOutputType)
});

export const ConnectionIDType = PropTypes.string;

export const ConnectionType = PropTypes.shape({
  id: ConnectionIDType,
  parentID: NodeIDType,
  childID: NodeIDType,
  inputOffset: PointType,
  outputOffset: PointType
});

export const GraphType = PropTypes.shape({
  name: PropTypes.string,
  nodes: PropTypes.objectOf(
    // Keys should be the ID of a node.
    // Values should be a NodeType.
    NodeType
  ),
  connections: PropTypes.objectOf(
    // Keys should be a connection ID
    // Values should be a ConnectionType
    ConnectionType
  )
});
