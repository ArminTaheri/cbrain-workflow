import React from "react";
import { Group } from "@vx/vx";
import { NODE_TYPE } from "../types";
import IOPin, { PIN_LABEL_DIRECTION } from "./IOPin";
import FileSourceNode from "./FileSourceNode";
import FileFilterNode from "./FileFilterNode";
import TaskNode from "./TaskNode";

const GraphNodeOverlay = ({
  width,
  height,
  node,
  nodePointerDown,
  inPinPointerDown,
  outPinPointerDown
}) => (
  <Group>
    {node.inputs.map((input, i) => (
      <IOPin
        key={`${i}-${node.inputs.length}`}
        pin={input}
        pinPointerDown={() => inPinPointerDown(node, i)}
        labelDirection={PIN_LABEL_DIRECTION.BOTTOM}
      />
    ))}
    <rect
      style={{ strokeOpacity: "0", fillOpacity: "0" }}
      width={width}
      height={height}
      onMouseDown={nodePointerDown}
    />
    {node.outputs.map((output, i) => (
      <IOPin
        key={`${i}-${node.outputs.length}`}
        pin={output}
        pinPointerDown={() => outPinPointerDown(node, i)}
        labelDirection={PIN_LABEL_DIRECTION.TOP}
      />
    ))}
  </Group>
);

const GraphNode = ({
  scaleX,
  scaleY,
  node,
  nodePointerDown,
  inPinPointerDown,
  outPinPointerDown
}) => {
  const renderOverlay = ({ width, height }) => (
    <GraphNodeOverlay
      width={width}
      height={height}
      node={node}
      nodePointerDown={nodePointerDown}
      inPinPointerDown={inPinPointerDown}
      outPinPointerDown={outPinPointerDown}
    />
  );
  const { type, position, content } = node;
  switch (type) {
    case NODE_TYPE.FILE_SOURCE: {
      return (
        <FileSourceNode
          renderOverlay={renderOverlay}
          scaleX={scaleX}
          scaleY={scaleY}
          position={position}
          source={content}
        />
      );
    }
    case NODE_TYPE.FILE_FILTER: {
      return (
        <FileFilterNode
          renderOverlay={renderOverlay}
          scaleX={scaleX}
          scaleY={scaleY}
          position={position}
          filter={content}
        />
      );
    }
    case NODE_TYPE.TASK: {
      return (
        <TaskNode
          renderOverlay={renderOverlay}
          scaleX={scaleX}
          scaleY={scaleY}
          position={position}
          task={content}
        />
      );
    }
    default: {
      return null;
    }
  }
};

export default GraphNode;
