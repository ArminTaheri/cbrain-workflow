import * as R from "ramda";
import React from "react";
import { Group } from "@vx/vx";
import { scaleLinear } from "d3-scale";
import withResizeObserverProps from "@hocs/with-resize-observer-props";
import { GraphType } from "../types";
import DEFAULT_STYLE from "../style";
import { fromMouseEvent } from "../../vector";
import GraphNode from "./GraphNode";
import GraphConnection from "./GraphConnection";

// GUI Layer containing the visual graph representation
// of the workflow.
const GraphLayer = ({
  graph,
  graphPointerDown = R.identity,
  graphPointerMove = R.identity,
  graphPointerUp = R.identity,
  nodePointerDown = R.identity,
  inPinPointerDown = R.identity,
  outPinPointerDown = R.identity,
  width = 400,
  height = 300,
  onRef
}) => {
  const scaleX = scaleLinear()
    .domain(DEFAULT_STYLE.graphDomain.x)
    .range([0, width]);
  const scaleY = scaleLinear()
    .domain(DEFAULT_STYLE.graphDomain.y)
    .range([0, height]);
  const nodes = R.values(graph.nodes);
  const connections = R.values(graph.connections);
  const eventToPos = e => fromMouseEvent(e, { scaleX, scaleY });
  return (
    <div
      ref={onRef}
      style={{ height: "100%" }}
      onMouseDown={e => graphPointerDown(eventToPos(e))}
      onMouseUp={e => graphPointerUp(eventToPos(e))}
      onMouseMove={e => graphPointerMove(eventToPos(e))}
    >
      <svg width={width} height={height - 5}>
        <Group>
          {nodes.map((node, i) => (
            <GraphNode
              key={`${i}-${nodes.length}`}
              scaleX={scaleX}
              scaleY={scaleY}
              node={node}
              nodePointerDown={pos => nodePointerDown(node, pos)}
              inPinPointerDown={inPinPointerDown}
              outPinPointerDown={outPinPointerDown}
            />
          ))}
          {connections.map((connection, i) => (
            <GraphConnection
              key={`${i}-${connections.length}`}
              graph={graph}
              connection={connection}
            />
          ))}
        </Group>
      </svg>
    </div>
  );
};

GraphLayer.propTypes = {
  graph: GraphType.isRequired
};

export default withResizeObserverProps(({ width, height }) => ({
  width,
  height
}))(GraphLayer);
