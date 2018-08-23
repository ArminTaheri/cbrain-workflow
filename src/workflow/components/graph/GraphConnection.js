import React from "react";
import { Group } from "@vx/vx";
import PropTypes from "prop-types";
import { GraphType, ConnectionType } from "../types";

// Sidebar component for working with a single nodes.
const GraphConnection = ({ xScale, yScale, connection }) => <Group />;

GraphConnection.propTypes = {
  xScale: PropTypes.func,
  yScale: PropTypes.func,
  graph: GraphType,
  connection: ConnectionType
};

export default GraphConnection;
