// @flow
import { Stream } from "most";
import * as most from "most";
import {
  createEventHandler,
  setObservableConfig
} from "recompose/mostObservableConfig";
import mostConfig from "recompose/mostObservableConfig";
import type {
  Point,
  Line,
  NodeID,
  ConnectionID,
  FileFilter,
  Task,
  GraphNode,
  Graph
} from "./types";
import { EMPTY_GRAPH } from "./graph";
import { makeFeedbackLoop } from "./util";

setObservableConfig(mostConfig);

export type WorkflowState = {
  graph: Graph,
  drag: Line | null,
  hovered: ConnectionID | NodeID | null
};

export const EMPTY_STATE = {
  graph: EMPTY_GRAPH,
  drag: null,
  hovered: null
};

export const workflowStates = (
  initialState: WorkflowState
): {
  state$: Stream<WorkflowState>,
  handlers: {
    placeTask: (task: { position: Position, task: ?Task }) => void,
    placeFileFilter: (filter: {
      position: Position,
      task: ?FileFilter
    }) => void,
    startMove: (node: NodeID) => void,
    endMove: () => void,
    continueMove: (point: Point) => void,
    startConnectionOutput: (start: {
      parentID: NodeID,
      outputIndex: number,
      offset: Point
    }) => void,
    endConnectionInput: (end: {
      childID: NodeID,
      inputIndex: number,
      offset: Point
    }) => void,
    startConnectionInput: (start: {
      childID: NodeID,
      inputIndex: number,
      offset: Point
    }) => void,
    endConnectionOutput: (start: {
      parentID: NodeID,
      outputIndex: number,
      offset: Point
    }) => void,
    continueConnection: (point: Point) => void,
    removeNode: (node: NodeID) => void,
    editNode: (edit: { node: NodeID, edit: GraphNode }) => void
  }
} => {
  const { handler: placeTask, stream: placeTask$ } = createEventHandler();
  const {
    handler: placeFileFilter,
    stream: placeFileFilter$
  } = createEventHandler();
  const { handler: startMove, stream: startMove$ } = createEventHandler();
  const { handler: endMove, stream: endMove$ } = createEventHandler();
  const { handler: continueMove, stream: continueMove$ } = createEventHandler();
  const {
    handler: startConnectionOutput,
    stream: startConnectionOutput$
  } = createEventHandler();
  const {
    handler: endConnectionInput,
    stream: endConnectionInput$
  } = createEventHandler();
  const {
    handler: startConnectionInput,
    stream: startConnectionInput$
  } = createEventHandler();
  const {
    handler: endConnectionOutput,
    stream: endConnectionOutput$
  } = createEventHandler();
  const {
    handler: continueConnection,
    stream: continueConnection$
  } = createEventHandler();
  const { handler: removeNode, stream: removeNode$ } = createEventHandler();
  const { handler: editNode, stream: editNode$ } = createEventHandler();
  const graph$ = makeFeedbackLoop(graph$ => {
    return graph$;
  });
  console.log(
    placeTask$,
    placeFileFilter$,
    startMove$,
    endMove$,
    continueMove$,
    startConnectionOutput$,
    endConnectionInput$,
    startConnectionInput$,
    endConnectionOutput$,
    continueConnection$,
    removeNode$,
    editNode$
  );
  return {
    state$: most.empty(),
    handlers: {
      placeTask,
      placeFileFilter,
      startMove,
      endMove,
      continueMove,
      startConnectionOutput,
      endConnectionInput,
      startConnectionInput,
      endConnectionOutput,
      continueConnection,
      removeNode,
      editNode
    }
  };
};
