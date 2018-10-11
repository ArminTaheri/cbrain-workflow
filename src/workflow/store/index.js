import * as R from "ramda";
import { combineReducers } from "redux";
import { combineEpics } from "redux-observable";
import {
  startConnectionOutput,
  endConnectionInput,
  startConnectionInput,
  endConnectionOutput,
  continueConnection,
  createMakeConnectionEpic
} from "./logic/drag-connections";

import { connectionDragReducer } from "./state/connection-drag";

import {
  placeNodeType,
  editNodeContent,
  createConfigureNodesEpic
} from "./logic/configure-nodes";

import {
  startNodeMove,
  endNodeMove,
  continueNodeMove,
  createMoveNodesEpic
} from "./logic/drag-nodes";

import { removeNode, editNode, setWorkflowName } from "./state/workflow";
import {
  setActiveWorkflow,
  addWorkflow,
  workflowsReducer
} from "./state/workflows";

import {
  startSelection,
  continueSelection,
  endSelection,
  createSelectionBoxEpic,
  removeSelection,
  startMoveSelection,
  continueMoveSelection,
  endMoveSelection,
  createSelectionEpic,
  copySelection,
  pasteClipboard,
  createClipboardEpic
} from "./logic/selection";

import {
  selectionBoxReducer,
  selectionReducer,
  clipboardReducer
} from "./state/selection";

import {
  startPan,
  continuePan,
  endPan,
  createViewboxEpic
} from "./logic/viewbox";

import { viewboxReducer } from "./state/viewbox";

import {
  addTaskDescriptor,
  taskDescriptorsReducer
} from "./state/task-descriptors";

export const rootReducer = combineReducers({
  taskDescriptors: taskDescriptorsReducer,
  workflows: workflowsReducer,
  connectionDrag: connectionDragReducer,
  selectionBox: selectionBoxReducer,
  selection: selectionReducer,
  clipboard: clipboardReducer,
  viewbox: viewboxReducer
});

const getActiveWorkflowGraph = state =>
  R.path([state.workflows.active, "graph"], state.workflows.table);

export const rootEpic = combineEpics(
  createMakeConnectionEpic(getActiveWorkflowGraph),
  createMoveNodesEpic(),
  createConfigureNodesEpic(),
  createSelectionBoxEpic(getActiveWorkflowGraph),
  createSelectionEpic(
    R.applySpec({
      graph: getActiveWorkflowGraph,
      selection: R.prop("selection")
    })
  ),
  createClipboardEpic(
    R.applySpec({
      graph: getActiveWorkflowGraph,
      clipboard: R.prop("clipboard"),
      selection: R.prop("selection")
    })
  ),
  createViewboxEpic(R.prop("viewbox"))
);

/* Transform a map of action builders to a map of redux dispatch functions
 * after being given a dispatch function.
 */
const makeDispatchers = actionBuilders => dispatch =>
  R.mapObjIndexed(
    actionBuilder =>
      R.compose(
        dispatch,
        actionBuilder
      ),
    actionBuilders
  );

export const mapDispatchToProps = makeDispatchers({
  setActiveWorkflow,
  addWorkflow,
  setWorkflowName,
  startConnectionOutput,
  endConnectionInput,
  startConnectionInput,
  endConnectionOutput,
  continueConnection,
  startNodeMove,
  endNodeMove,
  continueNodeMove,
  editNode,
  removeNode,
  placeNodeType,
  editNodeContent,
  startSelection,
  continueSelection,
  endSelection,
  removeSelection,
  startMoveSelection,
  continueMoveSelection,
  endMoveSelection,
  copySelection,
  pasteClipboard,
  startPan,
  continuePan,
  endPan,
  addTaskDescriptor
});
