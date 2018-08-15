import React from "react";
import PropTypes from "prop-types";
import { FileFilterType } from "../types";

const FilterNodeEdit = undefined;

FilterNodeEdit.propTypes = {
  fileFilter: FileFilterType.isRequired,
  setFilter: PropTypes.func
};

export default FilterNodeEdit;
