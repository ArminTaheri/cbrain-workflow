import PropTypes from "prop-types";

export const PointType = PropTypes.shape({
  x: PropTypes.number,
  y: PropTypes.number
});

export const LineType = PropTypes.shape({
  start: PointType,
  end: PointType
});
