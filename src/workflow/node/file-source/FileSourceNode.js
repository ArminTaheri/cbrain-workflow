import React from "react";
import PropTypes from "prop-types";
import { Group } from "@vx/vx";
import { PointType } from "../../types/geometry";
import { FileSourceType } from "./types";
import DEFAULT_STYLE from "../../components/style";

const Geometry = ({ title, width, height }) => (
  <Group>
    <rect style={{ fill: "orange" }} width={width} height={height} />
    <text style={DEFAULT_STYLE.textStyle.nodeName} x={width / 7} y={height / 2}>
      {title}
    </text>
  </Group>
);

const FileSourceNode = ({
  renderOverlay,
  scaleX,
  scaleY,
  position,
  source
}) => {
  const { width, height } = DEFAULT_STYLE.sizes.small;
  const Overlay = renderOverlay;
  return (
    <Group left={scaleX(position.x)} top={scaleY(position.y)}>
      <Geometry title={"Source"} width={width} height={height} />
      {Overlay && <Overlay width={width} height={height} />}
    </Group>
  );
};

FileSourceNode.propTypes = {
  renderOverlay: PropTypes.any,
  scaleX: PropTypes.func.isRequired,
  scaleY: PropTypes.func.isRequired,
  position: PointType.isRequired,
  source: FileSourceType.isRequired
};

export default FileSourceNode;
