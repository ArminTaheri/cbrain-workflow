import React from "react";
import PropTypes from "prop-types";
import { FileFilterType, PointType } from "../types";

const FileFilterNode = undefined;

FileFilterNode.propTypes = {
  position: PointType.isRequired,
  filter: FileFilterType.isRequired,
  onSelect: PropTypes.func
};

export default FileFilterNode;
