import React from "react";
import PropTypes from "prop-types";
import { PointType, FileSourceType } from "./types";

const FileSourceNode = undefined;

FileSourceNode.propTypes = {
  position: PointType.isRequired,
  source: FileSourceType.isRequired,
  onSelect: PropTypes.func
};

export default FileSourceNode;
