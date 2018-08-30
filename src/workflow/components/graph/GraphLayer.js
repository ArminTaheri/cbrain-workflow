import * as R from "ramda";
import React from "react";
import { Group } from "@vx/vx";
import { scaleLinear } from "d3-scale";
import withResizeObserverProps from "@hocs/with-resize-observer-props";
import PropTypes from "prop-types";
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
  viewBox = { left: 0, top: 0, width, height },
  onRef
}) => {
  const scaleX = scaleLinear()
    .domain(DEFAULT_STYLE.graphDomain.x)
    .range([0, width]);
  const scaleY = scaleLinear()
    .domain(DEFAULT_STYLE.graphDomain.y)
    .range([0, height]);
  const viewBoxScale = {
    scaleX: R.compose(
      scaleX.invert,
      scaleLinear()
        .domain([0, width])
        .range([viewBox.left, viewBox.left + viewBox.width])
    ),
    scaleY: R.compose(
      scaleY.invert,
      scaleLinear()
        .domain([0, height])
        .range([viewBox.top, viewBox.top + viewBox.height])
    )
  };
  const nodes = R.values(graph.nodes);
  const connections = R.values(graph.connections);
  const eventToPos = e => V.fromMouseEvent(e, viewBoxScale);
  return (
    <div
      ref={onRef}
      style={{ height: "100%" }}
      onMouseDown={e => graphPointerDown(eventToPos(e))}
      onMouseUp={e => graphPointerUp(eventToPos(e))}
      onMouseMove={e => graphPointerMove(eventToPos(e))}
    >
      <svg
        width={width}
        height={height - 5}
        viewBox={`${viewBox.left} ${viewBox.top} ${viewBox.width} ${
          viewBox.height
        }`}
      >
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
              nodePointerDown={(e, node) =>
                nodePointerDown(V.add(eventToPos(e), node.position), node)
              }
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
  graph: GraphType.isRequired,
  connectionDrag: PropTypes.object,
  graphPointerDown: PropTypes.func,
  graphPointerMove: PropTypes.func,
  graphPointerUp: PropTypes.func,
  nodePointerDown: PropTypes.func,
  outPinPointerDown: PropTypes.func,
  inPinPointerDown: PropTypes.func,
  outPinPointerUp: PropTypes.func,
  inPinPointerUp: PropTypes.func,
  width: PropTypes.number,
  height: PropTypes.number,
  viewBox: PropTypes.shape({
    left: PropTypes.number,
    top: PropTypes.number,
    width: PropTypes.number,
    height: PropTypes.number
  })
};

export default withResizeObserverProps(({ width, height }) => ({
  width,
  height
}))(GraphLayer);
