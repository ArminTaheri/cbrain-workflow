// @flow
import { Stream } from "most";

import type {
  Point,
  FileID,
  FileInfo,
  FileSource,
  FileSourceNode,
  FileFilter,
  FileFilterNode,
  Graph
} from "./types";

export const makeFileSourceNode = (
  graph: Graph,
  source: FileSource,
  position: Point
): FileSourceNode => ({
  position,
  type: "FILE_SOURCE",
  content: source,
  inputSize: 0,
  outputSize: 1
});

export const makeFileFilterNode = (
  graph: Graph,
  filter: FileFilter,
  position: Point
): FileFilterNode => ({
  position,
  type: "FILE_FILTER",
  content: filter,
  inputSize: 1,
  outputSize: 1
});
