import React from "react";
import { Group } from "@vx/vx";
import * as V from "../../vector";
import { NODE_TYPE } from "../types";
import DEFAULT_STYLE from "../style";
import IOPin from "./IOPin";
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
}) => {
  return (
    <Group>
      {node.inputs.map((input, i) => (
        <IOPin
          key={`${i}-${node.inputs.length}`}
          pin={input}
          offset={{
            x: (width * (i + 0.5)) / node.inputs.length,
            y: -DEFAULT_STYLE.pinPadding
          }}
          pinPointerDown={() => inPinPointerDown(node, i)}
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
          offset={{
            x: (width * (i + 0.5)) / node.outputs.length,
            y: DEFAULT_STYLE.pinPadding + height
          }}
          pin={output}
          pinPointerDown={() => outPinPointerDown(node, i)}
        />
      ))}
    </Group>
  );
};

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
      nodePointerDown={e => {
        const offset = V.fromMouseEvent(e, { scaleX, scaleY });
        nodePointerDown(V.add(offset, node.position));
      }}
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
