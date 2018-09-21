import PropTypes from "prop-types";

export const FileSourceType = PropTypes.shape({
  // Query function that closes over a lookup of some files.
  query: PropTypes.func
});
