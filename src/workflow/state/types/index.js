// @flow
export type Point = { x: number, y: number };
export type Line = { start: Point, end: Point };

export type NodeID = string;
export type Node<T, C> = {
  position: Point,
  type: T,
  content: C,
  inputSize: number,
  outputSize: number
};

export type ConnectionID = string;
export type Connection = {
  parentID: NodeID,
  childID: NodeID,
  inputIndex: number,
  outputIndex: number
};

export type FileID = string;
export type FileInfo = { name: string };

export type FILE_SOURCE = "FILE_SOURCE";
export type FileSource = { query: (params: {}) => { [FileID]: FileInfo } };
export type FileSourceOutput = { [FileID]: FileInfo };
export type FileSourceNode = Node<FILE_SOURCE, FileSource>;

export type FILE_FILTER = "FILE_FILTER";
export type FileFilter = { selection: Array<FileInfo> };
export type FileFilterInput = { [FileID]: FileInfo };
export type FileFilterOutput = { [FileID]: FileInfo };
export type FileFilterNode = Node<FILE_FILTER, FileFilter>;

export type TaskInput = {
  // Add relavant keys from boutiques schema
};

export type TaskOutput = {
  // Add relavant keys from boutiques schema
};

export type TaskInputGroup = {
  // Add relavant keys from boutiques schema
};

export type TASK = "TASK";
export type Task = {
  name: string,
  inputs: Array<TaskInput>,
  outputs: Array<TaskOutput>,
  groups: Array<TaskInputGroup>
};
export type TaskNode = Node<TASK, Task>;

export type GraphNode = FileSourceNode | FileFilterNode | TaskNode;

export type Graph = {
  name: string,
  nodes: { [NodeID]: GraphNode },
  edges: { [ConnectionID]: Connection }
};
