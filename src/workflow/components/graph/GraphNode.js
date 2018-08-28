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
  scaleX,
  scaleY,
  width,
  height,
  node,
  nodePointerDown,
  outPinPointerDown,
  inPinPointerDown,
  outPinPointerUp,
  inPinPointerUp
}) => {
  const inverseScale = V.trans(scaleX.invert, scaleY.invert);
  return (
    <Group>
      {node.inputs.map((input, i) => {
        const offset = {
          x: (width * (i + 0.5)) / node.inputs.length,
          y: -DEFAULT_STYLE.pinPadding
        };
        return (
          <IOPin
            key={`${i}-${node.inputs.length}`}
            pin={input}
            offset={offset}
            pinPointerDown={() => inPinPointerDown(node, inverseScale(offset))}
            pinPointerUp={() => inPinPointerUp(node, inverseScale(offset))}
          />
        );
      })}
      <rect
        style={{ strokeOpacity: "0", fillOpacity: "0" }}
        width={width}
        height={height}
        onMouseDown={nodePointerDown}
      />
      {node.outputs.map((output, i) => {
        const offset = {
          x: (width * (i + 0.5)) / node.outputs.length,
          y: DEFAULT_STYLE.pinPadding + height
        };
        return (
          <IOPin
            key={`${i}-${node.outputs.length}`}
            offset={offset}
            pin={output}
            pinPointerDown={() => outPinPointerDown(node, inverseScale(offset))}
            pinPointerUp={() => outPinPointerUp(node, inverseScale(offset))}
          />
        );
      })}
    </Group>
  );
};

const GraphNode = ({
  scaleX,
  scaleY,
  node,
  nodePointerDown,
  outPinPointerDown,
  inPinPointerDown,
  outPinPointerUp,
  inPinPointerUp
}) => {
  const renderOverlay = ({ width, height }) => (
    <GraphNodeOverlay
      scaleX={scaleX}
      scaleY={scaleY}
      width={width}
      height={height}
      node={node}
      nodePointerDown={e => {
        const offset = V.fromMouseEvent(e, { scaleX, scaleY });
        nodePointerDown(V.add(offset, node.position));
      }}
      outPinPointerDown={outPinPointerDown}
      inPinPointerDown={inPinPointerDown}
      outPinPointerUp={outPinPointerUp}
      inPinPointerUp={inPinPointerUp}
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
