import * as R from "ramda";
import React from "react";
import { Group } from "@vx/vx";
import { scaleLinear } from "d3-scale";
import withResizeObserverProps from "@hocs/with-resize-observer-props";
import { NODE_TYPE, GraphType } from "../types";
import Edge from "./Edge";
import FileSourceNode from "./FileSourceNode";
import FileFilterNode from "./FileFilterNode";
import TaskNode from "./TaskNode";

const GraphNode = ({ node, onMouseDown }) => {
  const renderOverlay = ({ width, height }) => (
    <rect
      style={{ strokOpacity: "0", fillOpacity: "0" }}
      width={width}
      height={height}
      onMouseDown={onMouseDown}
    />
  );
  const { type, position, content } = node;
  switch (type) {
    case NODE_TYPE.FILE_SOURCE: {
      return (
        <FileSourceNode
          renderOverlay={renderOverlay}
          position={position}
          source={content}
        />
      );
    }
    case NODE_TYPE.FILE_FILTER: {
      return (
        <FileFilterNode
          renderOverlay={renderOverlay}
          position={position}
          filter={content}
        />
      );
    }
    case NODE_TYPE.TASK: {
      return (
        <TaskNode
          renderOverlay={renderOverlay}
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

const GraphConnection = ({
  xScale,
  yScale,
  parent,
  child,
  inputIndex,
  outputIndex
}) => <Group />;

// GUI Layer containing the visual graph representation
// of the workflow.
const GraphLayer = ({
  graph,
  graphPointerDown,
  graphPointerMove,
  graphPointerUp,
  nodePointerDown,
  pinPointerDown,
  width = 400,
  height = 300,
  onRef
}) => {
  return (
    <div ref={onRef} style={{ height: "100%" }}>
      <svg width={width} height={height - 5}>
        <Group>
          {R.values(graph.nodes).map(node => (
            <GraphNode
              node={node}
              nodePointerDown={nodePointerDown}
              pinPointerDown={pinPointerDown}
            />
          ))}
          {R.values(graph.connections).map(
            ({ parentID, childID, inputIndex, outputIndex }) => (
              <GraphConnection
                parent={graph.nodes[parentID]}
                child={graph.nodes[childID]}
                inputIndex={inputIndex}
                outputIndex={outputIndex}
              />
            )
          )}
        </Group>
        <Group>
          <rect
            style={{ fillOpacity: "0", strokOpacity: "0" }}
            width={width}
            height={height}
            onMouseDown={graphPointerDown}
            onMouseUp={graphPointerUp}
            onMouseMove={graphPointerMove}
          />
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
