import PropTypes from "prop-types";
import { FileInfoType } from "../../types/file";

export const FileFilterType = PropTypes.shape({
  selection: PropTypes.arrayOf(FileInfoType)
});
