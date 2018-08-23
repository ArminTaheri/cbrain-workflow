import React from "react";
import { Group } from "@vx/vx";
import PropTypes from "prop-types";
import { LineType } from "../types";

// Sidebar component for working with a single nodes.
const DragLine = ({ xScale, yScale, drag }) => <Group />;

DragLine.propTypes = {
  xScale: PropTypes.func,
  yScale: PropTypes.func,
  drag: LineType.isRequired
};

export default DragLine;
