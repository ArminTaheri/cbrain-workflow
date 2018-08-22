import React from "react";
import { withState } from "recompose";
import PropTypes from "prop-types";
import { NodeInputType, NodeOutputType } from "../types";

// Render the input or output of a node.
const IOPin = ({ hovered, onHover }) => null;

IOPin.propTypes = {
  pin: PropTypes.oneOfType([NodeInputType, NodeOutputType]),
  hovered: PropTypes.bool,
  onHover: PropTypes.func
};

export default withState("hovered", "onHover", false)(IOPin);
