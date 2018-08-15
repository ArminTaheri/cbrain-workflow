import React from "react";
import PropTypes from "prop-types";
import { PointType, NodeOptionType } from "../types";

// GUI Layer containing the dragging edges
// while the user interacts with the workflow.
const NodeAddLayer = undefined;

NodeAddLayer.propTypes = {
  type: NodeOptionType,
  node: PointType,
  onPlaceNode: PropTypes.func
};

export default NodeAddLayer;
