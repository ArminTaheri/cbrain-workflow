import React from "react";
import { DropdownButton, MenuItem } from "react-bootstrap";
import PropTypes from "prop-types";

const TaskSelectMenu = ({
  tasks = [],
  selectedTask = null,
  setSelectedTask
}) => {
  return (
    <DropdownButton
      id="task-select-menu-dropdown"
      title={
        selectedTask
          ? `${selectedTask["name"]} - ${selectedTask["tool-version"]}`
          : "Nothing"
      }
    >
      {tasks.map((task, i) => (
        <MenuItem
          key={`${i}-${tasks.length}`}
          onClick={() => setSelectedTask(task)}
          eventKey={i}
        >
          {task["name"]} - {task["tool-version"]}
        </MenuItem>
      ))}
    </DropdownButton>
  );
};

TaskSelectMenu.propTypes = {
  selectedTask: PropTypes.object,
  tasks: PropTypes.arrayOf(PropTypes.object),
  selectTask: PropTypes.func
};

export default TaskSelectMenu;
