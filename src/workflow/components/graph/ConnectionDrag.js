import React from "react";
import { Line, Point } from "@vx/vx";
import PropTypes from "prop-types";
import { PointType } from "../../types/geometry";
import { NodeType } from "../../types/graph";
import * as V from "../../vector";

// Sidebar component for working with a single nodes.
const ConnectionDrag = ({
  scaleX,
  scaleY,
  startNode,
  offset,
  currentPosition
}) => {
  const scale = V.trans(scaleX, scaleY);
  const from = new Point(V.add(scale(startNode.position), offset));
  const to = new Point(scale(currentPosition));
  return <Line from={from} to={to} />;
};

ConnectionDrag.propTypes = {
  scaleX: PropTypes.func.isRequired,
  scaleY: PropTypes.func.isRequired,
  startNode: NodeType.isRequired,
  offset: PointType.isRequired,
  currentPosition: PointType.isRequired
};

export default ConnectionDrag;
