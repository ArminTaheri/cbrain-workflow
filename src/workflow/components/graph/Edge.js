import React from "react";
import PropTypes from "prop-types";
import { LineType } from "./types";

// Sidebar component for working with a single nodes.
const Edge = undefined;

Edge.propTypes = {
  edge: LineType.isRequired,
  onSelect: PropTypes.func
};

export default Edge;
