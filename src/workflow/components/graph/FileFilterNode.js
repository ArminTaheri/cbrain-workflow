import React from "react";
import PropTypes from "prop-types";
import { Group } from "@vx/vx";
import { PointType, FileFilterType } from "../types";
import DEFAULT_STYLE from "../style";

const Geometry = ({ title, width, height }) => (
  <Group>
    <rect style={{ fill: "DodgerBlue" }} width={width} height={height} />
    <text style={DEFAULT_STYLE.textStyle.nodeName} x={width / 7} y={height / 2}>
      {title}
    </text>
  </Group>
);

const FileFilterNode = ({
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
      <Geometry title={"Filter"} width={width} height={height} />
      {Overlay && <Overlay width={width} height={height} />}
    </Group>
  );
};

FileFilterNode.propTypes = {
  renderOverlay: PropTypes.any,
  position: PointType.isRequired,
  filter: FileFilterType.isRequired
};

export default FileFilterNode;
