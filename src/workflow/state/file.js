import * as R from "ramda";
import * as Rx from "rxjs/operators";
import { ofType } from "redux-observable";
import { createAction } from "redux-actions";
import { addNode } from "./graph";
import { NODE_TYPE } from "../components/types";

export const makePlaceNodeEpic = (type, nodeBuilder) => actions$ => {
  const addNode$ = actions$.pipe(
    ofType(type),
    Rx.filter(R.has("payload")),
    Rx.map(
      R.pipe(
        R.prop("payload"),
        nodeBuilder,
        addNode
      )
    )
  );

  return addNode$;
};

export const makeFileSourceNode = ({ position, source }) => ({
  position,
  type: NODE_TYPE.FILE_SOURCE,
  content: source,
  inputs: [],
  outputs: [{ name: "files" }]
});

export const makeFileFilterNode = ({ position, filter }) => ({
  position,
  type: NODE_TYPE.FILE_FILTER,
  content: filter,
  inputs: [{ name: "files" }],
  outputs: [{ name: "filtered" }]
});

export const PLACE_FILE_SOURCE_NODE = "PLACE_FILE_SOURCE_NODE";
export const placeFileSourceNode = createAction(PLACE_FILE_SOURCE_NODE);

export const PLACE_FILE_FILTER_NODE = "PLACE_FILE_FILTER_NODE";
export const placeFileFilterNode = createAction(PLACE_FILE_FILTER_NODE);

export const placeFileSourceNodeEpic = makePlaceNodeEpic(
  PLACE_FILE_SOURCE_NODE,
  makeFileSourceNode
);
export const placeFileFilterNodeEpic = makePlaceNodeEpic(
  PLACE_FILE_FILTER_NODE,
  makeFileFilterNode
);
