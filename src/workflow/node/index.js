import * as R from "ramda";
import FILE_SOURCE from "./file-source";
import FILE_FILTER from "./file-filter";
import TASK from "./task";

/*
 * See src/workflow/node/README.md for information
 * about adding new node types
 */

const NODE_CONFIGS = {
  FILE_SOURCE,
  FILE_FILTER,
  TASK
};

export default NODE_CONFIGS;

export const NODE_TYPES = R.pipe(
  R.keys,
  R.map(key => [key, key]),
  R.fromPairs
)(NODE_CONFIGS);
