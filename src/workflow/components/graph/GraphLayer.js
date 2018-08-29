import * as R from "ramda";
import React from "react";
import { Group } from "@vx/vx";
import { scaleLinear } from "d3-scale";
import withResizeObserverProps from "@hocs/with-resize-observer-props";
import { GraphType } from "../types";
import DEFAULT_STYLE from "../style";
import * as V from "../../vector";
import GraphNode from "./GraphNode";
import GraphConnection from "./GraphConnection";
import ConnectionDrag from "./ConnectionDrag";

// GUI Layer containing the visual graph representation
// of the workflow.
const GraphLayer = ({
  graph,
  connectionDrag = null,
  graphPointerDown = R.identity,
  graphPointerMove = R.identity,
  graphPointerUp = R.identity,
  nodePointerDown = R.identity,
  outPinPointerDown = R.identity,
  inPinPointerDown = R.identity,
  outPinPointerUp = R.identity,
  inPinPointerUp = R.identity,
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
  const eventToPos = e => V.fromMouseEvent(e, { scaleX, scaleY });
  return (
    <div
      ref={onRef}
      style={{ height: "100%" }}
      onMouseDown={e => graphPointerDown(eventToPos(e))}
      onMouseUp={e => graphPointerUp(eventToPos(e))}
      onMouseMove={e => graphPointerMove(eventToPos(e))}
    >
      <svg width={width} height={height - 5}>
        {connectionDrag && (
          <ConnectionDrag scaleX={scaleX} scaleY={scaleY} {...connectionDrag} />
        )}
        <Group>
          {connections.map((connection, i) => (
            <GraphConnection
              key={`${i}-${connections.length}`}
              scaleX={scaleX}
              scaleY={scaleY}
              graph={graph}
              connection={connection}
            />
          ))}
          {nodes.map((node, i) => (
            <GraphNode
              key={`${i}-${nodes.length}`}
              scaleX={scaleX}
              scaleY={scaleY}
              node={node}
              nodePointerDown={pos => nodePointerDown(node, pos)}
              outPinPointerDown={outPinPointerDown}
              inPinPointerDown={inPinPointerDown}
              outPinPointerUp={outPinPointerUp}
              inPinPointerUp={inPinPointerUp}
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
