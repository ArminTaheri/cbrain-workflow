import * as R from "ramda";
import React from "react";
import { Group } from "@vx/vx";
import { withState } from "recompose";
import PropTypes from "prop-types";
import { PointType, NodeInputType, NodeOutputType } from "../types";
import DEFAULT_STYLE from "../style";

// Render the input or output of a node.
const IOPin = ({
  pin,
  labelDirection,
  offset = { x: 0, y: 0 },
  pinPointerDown,
  hovered,
  setHovered
}) => {
  return (
    <Group left={offset.x} top={offset.y}>
      {hovered && (
        <text
          x={(-pin.name.length * 5) / 2}
          y={-1.5 * DEFAULT_STYLE.textStyle.ioPinName.height}
        >
          {pin.name}
        </text>
      )}
      <circle
        r={DEFAULT_STYLE.pinSize}
        onMouseDown={pinPointerDown}
        onMouseEnter={() => setHovered(true)}
        onMouseOut={() => setHovered(false)}
      />
    </Group>
  );
};

IOPin.propTypes = {
  pin: PropTypes.oneOfType([NodeInputType, NodeOutputType]),
  offset: PointType,
  pinPointerDown: PropTypes.func,
  hovered: PropTypes.bool,
  onHover: PropTypes.func
};

export default withState("hovered", "setHovered", false)(IOPin);
