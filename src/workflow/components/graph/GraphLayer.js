import * as R from "ramda";
import React from "react";
import { Group } from "@vx/vx";
import { scaleLinear } from "d3-scale";
import withResizeObserverProps from "@hocs/with-resize-observer-props";
import PropTypes from "prop-types";
import { GraphType } from "../types";
import DEFAULT_STYLE from "../style";
import * as V from "../../vector";
import { INITIAL_VIEWBOX } from "../../state/viewbox";
import GraphNode from "./GraphNode";
import GraphConnection from "./GraphConnection";
import ConnectionDrag from "./ConnectionDrag";
import SelectionBox from "./SelectionBox";

// GUI Layer containing the visual graph representation
// of the workflow.
const GraphLayer = ({
  graph,
  connectionDrag = null,
  selectionBox = null,
  selection = [],
  viewbox = INITIAL_VIEWBOX,
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
  const viewRect = {
    left: scaleX(viewbox.position.x),
    top: scaleY(viewbox.position.y),
    width: viewbox.zoom * width,
    height: viewbox.zoom * (height - 5)
  };
  const viewBoxScale = {
    scaleX: R.compose(
      scaleX.invert,
      scaleLinear()
        .domain([0, width])
        .range([viewRect.left, viewRect.left + viewRect.width])
    ),
    scaleY: R.compose(
      scaleY.invert,
      scaleLinear()
        .domain([0, height])
        .range([viewRect.top, viewRect.top + viewRect.height])
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
        viewBox={[
          viewRect.left,
          viewRect.top,
          viewRect.width,
          viewRect.height
        ].join(" ")}
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
              selected={selection.includes(node.id)}
              nodePointerDown={(e, node) =>
                nodePointerDown(V.add(eventToPos(e), node.position), node)
              }
              outPinPointerDown={outPinPointerDown}
              inPinPointerDown={inPinPointerDown}
              outPinPointerUp={outPinPointerUp}
              inPinPointerUp={inPinPointerUp}
            />
          ))}
          {selectionBox && (
            <SelectionBox scaleX={scaleX} scaleY={scaleY} box={selectionBox} />
          )}
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
