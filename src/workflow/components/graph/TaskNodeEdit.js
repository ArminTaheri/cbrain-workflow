import React from "react";
import PropTypes from "prop-types";
import { TaskType } from "../types";

const TaskNodeEdit = undefined;

TaskNodeEdit.propTypes = {
  task: TaskType.isRequired,
  setTask: PropTypes.func
};

export default TaskNodeEdit;
