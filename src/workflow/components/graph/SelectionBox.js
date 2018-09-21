import React from "react";
import PropTypes from "prop-types";
import { LineType } from "../../types/geometry";
import * as V from "../../vector";

// Sidebar component for working with a single nodes.
const SelectionBox = ({ scaleX, scaleY, box }) => {
  const scale = V.trans(scaleX, scaleY);
  const { start, end } = box;
  const min = V.min(start, end);
  const max = V.max(start, end);
  const { x, y } = scale(min);
  const { x: width, y: height } = scale(V.sub(max, min));

  return (
    <rect
      style={{ pointerEvents: "none", stroke: "black", fillOpacity: "0" }}
      x={x}
      y={y}
      width={width}
      height={height}
    />
  );
};

SelectionBox.propTypes = {
  scaleX: PropTypes.func.isRequired,
  scaleY: PropTypes.func.isRequired,
  box: LineType.isRequired
};

export default SelectionBox;
