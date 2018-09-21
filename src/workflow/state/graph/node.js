import * as R from "ramda";
import { merge } from "rxjs";
import * as Rx from "rxjs/operators";
import { ofType } from "redux-observable";
import { createAction } from "redux-actions";
import NODE_CONFIGS from "../../node";
import { addNode, editNode } from "./graph";
import * as V from "../../vector";

export const PLACE_NODE_TYPE = "PLACE_NODE_TYPE";
export const placeNodeType = createAction(PLACE_NODE_TYPE);

export const EDIT_NODE_CONTENT = "EDIT_NODE_CONTENT";
export const editNodeContent = createAction(EDIT_NODE_CONTENT);

export const nodeConfigEpic = action$ => {
  const placeNodeType$ = action$.pipe(
    ofType(PLACE_NODE_TYPE),
    Rx.filter(R.has("payload")),
    Rx.map(({ payload }) => {
      const nodeData = NODE_CONFIGS[R.prop("type", payload)].create(payload);
      return addNode({
        position: payload.position,
        type: payload.type,
        content: nodeData.content,
        inputs: R.concat([], nodeData.inputs || []),
        outputs: R.concat([], nodeData.outputs || [])
      });
    })
  );
  const editNodeContent$ = action$.pipe(
    ofType(EDIT_NODE_CONTENT),
    Rx.filter(R.has("payload")),
    Rx.map(({ payload }) =>
      NODE_CONFIGS[R.path(["node", "type"], payload)].edit(payload)
    )
  );

  return merge(placeNodeType$, editNodeContent$);
};

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
          editNode(
            R.assoc(
              "position",
              V.add(node.position, V.sub(currentPos, startPos)),
              node
            )
          )
        ),
        Rx.takeUntil(endNodeMove$)
      )
    )
  );
  return editNode$;
};
