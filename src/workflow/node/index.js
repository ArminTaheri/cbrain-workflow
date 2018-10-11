import * as R from "ramda";
import FILE_SOURCE from "./file-source";
import FILE_FILTER from "./file-filter";
import TASK from "./task";
import INPUT_PIN from "./input-pin";
import OUTPUT_PIN from "./output-pin";
import WORKFLOW from "./sub-workflow";

/*
 * See src/workflow/node/README.md for information
 * about adding new node types
 */

const NODE_CONFIGS = {
  FILE_SOURCE,
  FILE_FILTER,
  TASK,
  INPUT_PIN,
  OUTPUT_PIN,
  WORKFLOW
};

export default NODE_CONFIGS;

export const NODE_TYPES = R.pipe(
  R.keys,
  R.map(key => [key, key]),
  R.fromPairs
)(NODE_CONFIGS);
