import * as R from "ramda";
import * as Rx from "rxjs/operators";
import { ofType } from "redux-observable";
import { createAction } from "redux-actions";
import { addNode } from "./graph";
import { NODE_TYPE } from "../components/types";

export const makeTaskNode = ({ position, task }) => {
  const { inputs, outputs } = task;
  return {
    position,
    type: NODE_TYPE.TASK,
    content: task,
    inputs: inputs.map(({ name }) => ({ name })),
    outputs: outputs.map(({ name }) => ({ name }))
  };
};

export const PLACE_TASK_NODE = "PLACE_TASK_NODE";
export const placeTaskNode = createAction(PLACE_TASK_NODE);

export const placeTaskNodeEpic = actions$ => {
  const addNode$ = actions$.pipe(
    ofType(PLACE_TASK_NODE),
    Rx.filter(R.has("payload")),
    Rx.map(
      R.pipe(
        R.prop("payload"),
        makeTaskNode,
        addNode
      )
    )
  );
  return addNode$;
};
