import * as R from "ramda";
import { combineReducers } from "redux";
import { combineEpics } from "redux-observable";
import {
  startConnectionOutput,
  endConnectionInput,
  continueConnection,
  makeConnectionEpic,
  connectionDragReducer,
  startNodeMove,
  endNodeMove,
  continueNodeMove,
  moveNodesEpic,
  editNode,
  removeNode,
  graphReducer
} from "./graph";

import {
  startSelection,
  continueSelection,
  endSelection,
  selectionBoxEpic,
  selectionBoxReducer,
  removeSelection,
  startMoveSelection,
  continueMoveSelection,
  endMoveSelection,
  selectionEpic,
  selectionReducer,
  copySelection,
  pasteClipboard,
  clipboardEpic,
  clipboardReducer
} from "./selection";

import {
  placeFileSourceNode,
  placeFileSourceNodeEpic,
  placeFileFilterNode,
  placeFileFilterNodeEpic
} from "./file";

import { placeTaskNode, placeTaskNodeEpic } from "./task";

export const rootEpic = combineEpics(
  makeConnectionEpic,
  moveNodesEpic,
  placeFileSourceNodeEpic,
  placeFileFilterNodeEpic,
  placeTaskNodeEpic,
  selectionBoxEpic,
  selectionEpic,
  clipboardEpic
);

export const rootReducer = combineReducers({
  graph: graphReducer,
  connectionDrag: connectionDragReducer,
  selectionBox: selectionBoxReducer,
  selection: selectionReducer,
  clipboard: clipboardReducer
});

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
  startConnectionOutput,
  endConnectionInput,
  continueConnection,
  startNodeMove,
  endNodeMove,
  continueNodeMove,
  editNode,
  removeNode,
  placeFileSourceNode,
  placeFileFilterNode,
  placeTaskNode,
  startSelection,
  continueSelection,
  endSelection,
  removeSelection,
  startMoveSelection,
  continueMoveSelection,
  endMoveSelection,
  copySelection,
  pasteClipboard
});
