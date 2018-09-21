import PropTypes from "prop-types";

export const TaskInputType = PropTypes.shape({
  // Add relevant keys from boutiques schema for inputs
});

export const TaskOutputType = PropTypes.shape({
  // Add relevant keys from boutiques schema for outputs
});

export const TaskInputGroup = PropTypes.shape({
  // Add relevant keys from boutiques schema for input groups
});

export const TaskType = PropTypes.shape({
  id: PropTypes.string,
  name: PropTypes.string,
  inputs: PropTypes.arrayOf(TaskInputType),
  outputs: PropTypes.arrayOf(TaskOutputType),
  groups: PropTypes.arrayOf(TaskInputGroup)
});
