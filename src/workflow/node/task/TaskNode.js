import React from "react";
import PropTypes from "prop-types";
import { PointType } from "../../types/geometry";
import { TaskType } from "./types";

const TaskNode = ({ renderOverlay, position, task }) => null;

TaskNode.propTypes = {
  renderOverlay: PropTypes.element,
  position: PointType.isRequired,
  task: TaskType.isRequired
};

export default TaskNode;
