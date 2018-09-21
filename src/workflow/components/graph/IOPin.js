import React from "react";
import { Group } from "@vx/vx";
import { withState } from "recompose";
import PropTypes from "prop-types";
import { NodeInputType, NodeOutputType } from "../../types/graph";
import { PointType } from "../../types/geometry";
import DEFAULT_STYLE from "../style";

// Render the input or output of a node.
const IOPin = ({
  pin,
  labelDirection,
  offset = { x: 0, y: 0 },
  pinPointerDown,
  pinPointerUp,
  showName = false,
  hovered = false,
  setHovered
}) => {
  return (
    <Group left={offset.x} top={offset.y}>
      {(showName || hovered) && (
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
        onMouseUp={pinPointerUp}
        onMouseEnter={() => setHovered(true)}
        onMouseOut={() => setHovered(false)}
      />
    </Group>
  );
};

IOPin.propTypes = {
  pin: PropTypes.oneOfType([NodeInputType, NodeOutputType]).isRequired,
  offset: PointType.isRequired,
  pinPointerDown: PropTypes.func,
  pinPointerUp: PropTypes.func,
  showName: PropTypes.bool,
  hovered: PropTypes.bool,
  setHovered: PropTypes.func
};

export default withState("hovered", "setHovered", false)(IOPin);
