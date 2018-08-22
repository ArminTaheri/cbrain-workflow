import React from "react";
import PropTypes from "prop-types";
import { FileFilterType, PointType } from "../types";

const FileFilterNode = ({ renderOverlay, position, filter }) => null;

FileFilterNode.propTypes = {
  renderOverlay: PropTypes.element,
  position: PointType.isRequired,
  filter: FileFilterType.isRequired
};

export default FileFilterNode;
