import React from "react";
import PropTypes from "prop-types";
import { Group } from "@vx/vx";
import { PointType } from "../../types/geometry";
import { NodeType } from "../../types/graph";
import { TaskType } from "./types";
import DEFAULT_STYLE from "../../components/style";

const Geometry = ({ lines, width, height }) => (
  <Group>
    <rect style={{ fill: "tomato" }} width={width} height={height} />
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

const TaskNode = ({ node, renderOverlay, scaleX, scaleY, position, task }) => {
  let { width, height } = DEFAULT_STYLE.sizes.large;
  const Overlay = renderOverlay;
  const lines = ["Task", `${task.name}`, `${task["tool-version"]}`];
  return (
    <Group left={scaleX(position.x)} top={scaleY(position.y)}>
      <Geometry lines={lines} width={width} height={height} />
      {Overlay && <Overlay width={width} height={height} />}
    </Group>
  );
};

TaskNode.propTypes = {
  node: NodeType.isRequired,
  renderOverlay: PropTypes.any,
  position: PointType.isRequired,
  task: TaskType.isRequired
};

export default TaskNode;
