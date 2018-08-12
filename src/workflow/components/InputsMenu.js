import React from "react";
import PropTypes from "prop-types";
import { InputType } from "./types";

const InputsMenu = undefined;

InputsMenu.propTypes = {
  inputs: PropTypes.arrayOf(InputType),
  onSelect: PropTypes.func
};

export default InputsMenu;
