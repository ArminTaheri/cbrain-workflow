import * as R from "ramda";
import * as Rx from "rxjs/operators";
import { ofType } from "redux-observable";
import { createAction } from "redux-actions";
import { editNode } from "./graph";
import * as V from "../../vector";

export const START_NODE_MOVE = "START_NODE_MOVE";
export const startNodeMove = createAction(START_NODE_MOVE);

export const END_NODE_MOVE = "END_NODE_MOVE";
export const endNodeMove = createAction(END_NODE_MOVE);

export const CONTINUE_NODE_MOVE = "CONTINUE_NODE_MOVE";
export const continueNodeMove = createAction(CONTINUE_NODE_MOVE);

export const moveNodesEpic = (action$, state$) => {
  const startNodeMove$ = action$.pipe(
    ofType(START_NODE_MOVE),
    Rx.filter(R.has("payload")),
    Rx.map(
      R.pipe(
        R.prop("payload"),
        ({ node, position }) => ({ node, startPos: position })
      )
    )
  );
  const endNodeMove$ = action$.pipe(
    ofType(END_NODE_MOVE),
    Rx.mapTo(null)
  );
  const continueNodeMove$ = action$.pipe(
    ofType(CONTINUE_NODE_MOVE),
    Rx.map(R.path(["payload", "position"]))
  );
  const editNode$ = startNodeMove$.pipe(
    Rx.switchMap(({ startPos, node }) =>
      continueNodeMove$.pipe(
        Rx.map(currentPos =>
          editNode({
            node: R.assoc(
              "position",
              V.add(node.position, V.sub(currentPos, startPos)),
              node
            )
          })
        ),
        Rx.takeUntil(endNodeMove$)
      )
    )
  );
  return editNode$;
};
