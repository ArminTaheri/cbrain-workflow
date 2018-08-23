import * as R from "ramda";
import React from "react";
import { Group } from "@vx/vx";
import { withState } from "recompose";
import PropTypes from "prop-types";
import { PointType, NodeInputType, NodeOutputType } from "../types";

export const PIN_LABEL_DIRECTION = {
  TOP: "TOP",
  BOTTOM: "BOTTOM"
};

// Render the input or output of a node.
const IOPin = ({
  pin,
  labelDirection,
  position,
  pinPointerDown,
  hovered,
  onHover
}) => <Group />;

IOPin.propTypes = {
  pin: PropTypes.oneOfType([NodeInputType, NodeOutputType]),
  labelDirection: PropTypes.oneOf(R.values(PIN_LABEL_DIRECTION)),
  position: PointType,
  pinPointerDown: PropTypes.func,
  hovered: PropTypes.bool,
  onHover: PropTypes.func
};

export default withState("hovered", "onHover", false)(IOPin);
