import React from "react";
import PropTypes from "prop-types";
import { PointType, TaskType } from "./types";

const TaskNode = undefined;

TaskNode.propTypes = {
  position: PointType.isRequired,
  task: TaskType.isRequired,
  onSelect: PropTypes.func
};

export default TaskNode;
