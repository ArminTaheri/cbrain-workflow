import PropTypes from "prop-types";
import { PointType } from "./geometry";

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
  type: PropTypes.string,
  content: PropTypes.object,
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
