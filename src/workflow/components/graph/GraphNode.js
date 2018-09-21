import React from "react";
import { Group } from "@vx/vx";
import NODE_CONFIGS from "../../node";
import DEFAULT_STYLE from "../style";
import IOPin from "./IOPin";

const GraphNodeOverlay = ({
  scaleX,
  scaleY,
  width,
  height,
  node,
  selected,
  nodePointerDown,
  outPinPointerDown,
  inPinPointerDown,
  outPinPointerUp,
  inPinPointerUp
}) => {
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
            pinPointerDown={() => inPinPointerDown(node, offset)}
            pinPointerUp={() => inPinPointerUp(node, offset)}
          />
        );
      })}
      <rect
        style={{
          stroke: selected ? "DarkGreen" : "none",
          strokeWidth: "2",
          fillOpacity: "0"
        }}
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
            pinPointerDown={() => outPinPointerDown(node, offset)}
            pinPointerUp={() => outPinPointerUp(node, offset)}
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
  selected = false,
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
      selected={selected}
      nodePointerDown={e => nodePointerDown(e, node)}
      outPinPointerDown={outPinPointerDown}
      inPinPointerDown={inPinPointerDown}
      outPinPointerUp={outPinPointerUp}
      inPinPointerUp={inPinPointerUp}
    />
  );
  const { type, position, content } = node;
  const NodeComponent = NODE_CONFIGS[type].component;
  return (
    <NodeComponent
      renderOverlay={renderOverlay}
      scaleX={scaleX}
      scaleY={scaleY}
      position={position}
      content={content}
    />
  );
};

export default GraphNode;
