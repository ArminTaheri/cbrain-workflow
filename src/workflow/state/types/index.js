// @flow
export type Point = { x: number, y: number };
export type Line = { start: Point, end: Point };

export type FileID = string;
export type FileInfo = { name: string };

export type FileSource = { query: (params: {}) => { [FileID]: FileInfo } };

export type FileFilter = { selection: Array<FileInfo> };

export type TaskInput = {
  // Add relavant keys from boutiques schema
};

export type TaskOutput = {
  // Add relavant keys from boutiques schema
};

export type TaskInputGroup = {
  // Add relavant keys from boutiques schema
};

export type Task = {
  name: string,
  inputs: Array<TaskInput>,
  outputs: Array<TaskOutput>,
  groups: Array<TaskInputGroup>
};

export type NodeID = String;
export type Node<N> = {
  position: Point,
  content: N
};

export type GraphNode = Node<FileSource> | Node<FileFilter> | Node<Task>;

export type ConnectionID = string;
export type Connection = {
  parentID: NodeID,
  childID: NodeID,
  inputIndex: number,
  outputIndex: number
};

export type Graph = {
  name: string,
  nodes: { [NodeID]: GraphNode },
  edges: { [ConnectionID]: Connection }
};
