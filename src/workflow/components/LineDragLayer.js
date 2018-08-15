import React from "react";
import PropTypes from "prop-types";
import { LineType } from "./types";

// GUI Layer containing the dragging edges
// while the user interacts with the workflow.
const LineDragLayer = undefined;

LineDragLayer.propTypes = {
  drag: LineType,
  onDragStart: PropTypes.func,
  onDragEnd: PropTypes.func
};

export default LineDragLayer;
