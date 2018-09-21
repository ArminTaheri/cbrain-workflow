import React from "react";
import { Line, Point } from "@vx/vx";
import PropTypes from "prop-types";
import { GraphType, ConnectionType } from "../../types/graph";
import * as V from "../../vector";

// Sidebar component for working with a single nodes.
const GraphConnection = ({ scaleX, scaleY, connection, graph }) => {
  const startNode = graph.nodes[connection.parentID];
  const endNode = graph.nodes[connection.childID];
  if (!startNode || !endNode) {
    return null;
  }
  const scale = V.trans(scaleX, scaleY);
  const from = new Point(
    V.add(scale(startNode.position), connection.outputOffset)
  );
  const to = new Point(V.add(scale(endNode.position), connection.inputOffset));
  return <Line from={from} to={to} />;
};

GraphConnection.propTypes = {
  scaleX: PropTypes.func.isRequired,
  scaleY: PropTypes.func.isRequired,
  connection: ConnectionType.isRequired,
  graph: GraphType.isRequired
};

export default GraphConnection;
