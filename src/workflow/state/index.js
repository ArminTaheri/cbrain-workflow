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
  placeTaskNodeEpic
);

export const rootReducer = combineReducers({
  graph: graphReducer,
  connectionDrag: connectionDragReducer
});

/* Transform a map of action builders to map of redux dispatch functions
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
  placeTaskNode
});
