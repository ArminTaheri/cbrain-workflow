import React from "react";
import { DropdownButton, MenuItem } from "react-bootstrap";
import PropTypes from "prop-types";

const WorkflowSelectMenu = ({
  workflows = [],
  selectedWorkflow = null,
  setSelectedWorkflow
}) => {
  const selected = workflows.find(w => w.id === selectedWorkflow);
  return (
    <DropdownButton
      id="task-select-menu-dropdown"
      title={selected ? `${selected.name}` : "Nothing"}
    >
      {workflows.map((workflow, i) => (
        <MenuItem
          key={`${i}-${workflows.length}`}
          onClick={() => setSelectedWorkflow(workflow.id)}
          eventKey={i}
        >
          {workflow.name}
        </MenuItem>
      ))}
    </DropdownButton>
  );
};

WorkflowSelectMenu.propTypes = {
  selectedTask: PropTypes.object,
  tasks: PropTypes.arrayOf(PropTypes.object),
  selectTask: PropTypes.func
};

export default WorkflowSelectMenu;
