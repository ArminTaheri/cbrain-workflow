import React from "react";
import PropTypes from "prop-types";
import { Group } from "@vx/vx";
import { PointType } from "../../types/geometry";
import { NodeType } from "../../types/graph";
import DEFAULT_STYLE from "../../components/style";

const Geometry = ({ lines, width, height }) => (
  <Group>
    <rect style={{ fill: "LightSteelBlue" }} width={width} height={height} />
    {lines.map((line, i) => (
      <text
        key={`${i}-${lines.length}`}
        style={DEFAULT_STYLE.textStyle.nodeName}
        x={width / 7}
        y={((i + 0.5) * height) / lines.length}
      >
        {line}
      </text>
    ))}
  </Group>
);

const OutputPinNode = ({
  node,
  renderOverlay,
  scaleX,
  scaleY,
  position,
  output
}) => {
  let { width, height } = DEFAULT_STYLE.sizes.medium;
  const Overlay = renderOverlay;
  const lines = ["Output Pin", `${output.name}`];
  return (
    <Group left={scaleX(position.x)} top={scaleY(position.y)}>
      <Geometry lines={lines} width={width} height={height} />
      {Overlay && <Overlay width={width} height={height} />}
    </Group>
  );
};

OutputPinNode.propTypes = {
  node: NodeType.isRequired,
  renderOverlay: PropTypes.element,
  position: PointType.isRequired,
  output: PropTypes.object
};

export default OutputPinNode;
