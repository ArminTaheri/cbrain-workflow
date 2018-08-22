import React from "react";
import PropTypes from "prop-types";
import { PointType, FileSourceType } from "../types";

const FileSourceNode = ({ renderOverlay, position, source }) => null;

FileSourceNode.propTypes = {
  renderOverlay: PropTypes.any,
  position: PointType.isRequired,
  source: FileSourceType.isRequired
};

export default FileSourceNode;
