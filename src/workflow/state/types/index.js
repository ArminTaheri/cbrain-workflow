// @flow
export type Point = { x: number, y: number };
export type Line = { start: Point, end: Point };

export type FileID = string;
export type FileInfoParams = { name: string };
export type FileInfo = { id: FileID } & FileInfoParams;

export type FileSource = { query: (params: {}) => Array<FileInfo> };

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

export type ContentTypes = FileSource | FileFilter | Task;

export type NodeID = String;
export type NodeParams = {
  position: Point,
  content: ContentTypes
};
export type Node = { id: NodeID } & NodeParams;
export type ConnectionID = String;
export type ConnectionParams = {};
export type Connection = { id: ConnectionID } & ConnectionParams;

export type Graph = {
  name: string,
  nodes: { [NodeID]: Node },
  edges: { [ConnectionID]: Connection }
};
